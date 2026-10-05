// Fetches papers from Semantic Scholar for the author profiles listed in
// src/data/publications.overrides.yaml and writes them to
// src/data/publications.cache.json. Curation (venue status, tags, notes,
// hiding duplicates) lives in the overrides file and is applied at build time.
//
// If the API is unreachable or rate-limited, the existing cache is kept so
// the build never breaks.

import { readFile, writeFile } from 'node:fs/promises';
import { parse } from 'yaml';

const OVERRIDES = new URL('../src/data/publications.overrides.yaml', import.meta.url);
const CACHE = new URL('../src/data/publications.cache.json', import.meta.url);
const API = 'https://api.semanticscholar.org/graph/v1';
const FIELDS = 'title,year,venue,publicationDate,externalIds,authors,journal,citationCount';

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getJson(url, attempts = 5) {
  for (let i = 0; i < attempts; i++) {
    let res;
    try {
      // Bounded so a stalled connection falls back to the cache instead of hanging the build.
      res = await fetch(url, { headers: { 'user-agent': 'hoenchioma.github.io build' }, signal: AbortSignal.timeout(20_000) });
    } catch (err) {
      if (i === attempts - 1) throw err;
      await sleep(2000 * 2 ** i);
      continue;
    }
    if (res.ok) return res.json();
    if (res.status !== 429 && res.status < 500) throw new Error(`${res.status} ${res.statusText} for ${url}`);
    await sleep(2000 * 2 ** i);
  }
  throw new Error(`gave up after ${attempts} attempts: ${url}`);
}

function normalize(p) {
  const ids = p.externalIds ?? {};
  const doi = ids.DOI ?? null;
  const arxivFromDoi = doi?.toLowerCase().startsWith('10.48550/arxiv.') ? doi.slice('10.48550/arxiv.'.length) : null;
  const journal = p.journal?.name ?? '';
  const venue = /arxiv/i.test(journal || p.venue || '') ? 'arXiv' : journal || p.venue || 'arXiv';
  return {
    id: p.paperId,
    title: p.title,
    authors: (p.authors ?? []).map((a) => a.name),
    year: p.year ?? null,
    date: p.publicationDate ?? null,
    venue,
    doi: arxivFromDoi ? null : doi,
    arxiv: ids.ArXiv ?? arxivFromDoi,
    citations: p.citationCount ?? 0,
  };
}

async function main() {
  const overrides = parse(await readFile(OVERRIDES, 'utf8'));
  // The full overrides file is validated at build time (src/lib/publications.ts);
  // here we only need the author ids, and a bad list is a config error, not an outage.
  const authorIds = overrides?.semanticScholarAuthors;
  if (!Array.isArray(authorIds) || authorIds.length === 0 || !authorIds.every((id) => /^\d+$/.test(String(id)))) {
    console.error('[publications] semanticScholarAuthors in publications.overrides.yaml must be a non-empty list of numeric ids');
    process.exit(1);
  }
  const byId = new Map();
  for (const authorId of authorIds) {
    const data = await getJson(`${API}/author/${authorId}/papers?fields=${FIELDS}&limit=100`);
    // Every profile has papers, so an empty or malformed list means a bad response: throw so the cache is kept.
    if (!Array.isArray(data?.data) || data.data.length === 0) throw new Error(`no papers returned for author ${authorId}`);
    for (const p of data.data) byId.set(p.paperId, normalize(p));
    await sleep(1000);
  }
  const papers = [...byId.values()].sort((a, b) => (b.date ?? `${b.year}`).localeCompare(a.date ?? `${a.year}`));
  await writeFile(CACHE, JSON.stringify({ fetchedAt: new Date().toISOString(), papers }, null, 2) + '\n');
  console.log(`[publications] fetched ${papers.length} papers from ${authorIds.length} Semantic Scholar profiles`);
}

main().catch(async (err) => {
  let cached = false;
  try { await readFile(CACHE); cached = true; } catch {}
  console.warn(`[publications] fetch failed (${err.message}); ${cached ? 'using cached copy' : 'no cache available'}`);
  if (!cached) process.exit(1);
});
