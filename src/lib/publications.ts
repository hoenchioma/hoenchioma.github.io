import { parse } from 'yaml';
import { z } from 'astro/zod';
import cache from '../data/publications.cache.json';
import overridesRaw from '../data/publications.overrides.yaml?raw';

// Runtime schema for the hand-edited overrides file, so a typo (e.g. an unknown
// status or a misspelled field) fails the build instead of silently changing output.
const StatusSchema = z.enum(['published', 'accepted', 'preprint']);
type Status = z.infer<typeof StatusSchema>;

const OverrideSchema = z
  .object({
    hide: z.boolean().optional(),
    mergeInto: z.string().optional(),
    title: z.string().optional(),
    venue: z.string().optional(),
    year: z.number().int().optional(),
    status: StatusSchema.optional(),
    links: z.object({ code: z.url().optional(), arxiv: z.string().optional(), paper: z.url().optional() }).strict().optional(),
    tags: z.array(z.string()).optional(),
    summary: z.string().optional(),
    note: z.string().optional(),
  })
  .strict();

const OverridesSchema = z
  .object({
    semanticScholarAuthors: z.array(z.string().regex(/^\d+$/)).min(1),
    authorNames: z.record(z.string(), z.string()).optional(),
    me: z.string(),
    selected: z.object({ recent: z.number().int().min(0), mostCited: z.number().int().min(0) }).partial().optional(),
    papers: z.record(z.string(), OverrideSchema.nullable()).optional(),
  })
  .strict();

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  year: number;
  date: string;
  venue: string;
  status: Status;
  citations: number;
  links: { label: string; href: string }[];
  tags: string[];
  summary?: string;
  note?: string;
}

const parsed = OverridesSchema.safeParse(parse(overridesRaw));
if (!parsed.success) {
  throw new Error(`Invalid src/data/publications.overrides.yaml:\n${z.prettifyError(parsed.error)}`);
}
export const overrides = parsed.data;
export const me = overrides.me;

function build(): Publication[] {
  const curated = Object.fromEntries(Object.entries(overrides.papers ?? {}).map(([k, v]) => [k, v ?? {}]));
  const fixName = (n: string) => overrides.authorNames?.[n] ?? n;
  const extraCitations = new Map<string, number>();
  for (const p of cache.papers) {
    const target = curated[p.id]?.mergeInto;
    if (target) extraCitations.set(target, (extraCitations.get(target) ?? 0) + p.citations);
  }

  return cache.papers
    .filter((p) => !curated[p.id]?.hide && !curated[p.id]?.mergeInto)
    .filter((p) => {
      // A record without a year can't be placed on the page; give it `year` in the overrides to show it.
      if (p.year ?? curated[p.id]?.year) return true;
      console.warn(`[publications] skipping "${p.title}" (${p.id}): no year; set papers.${p.id}.year in the overrides to include it`);
      return false;
    })
    .map((p) => {
      const o = curated[p.id] ?? {};
      const year = (o.year ?? p.year)!;
      const arxiv = o.links?.arxiv ?? p.arxiv;
      const status: Status = o.status ?? (p.venue === 'arXiv' ? 'preprint' : 'published');
      const links: Publication['links'] = [];
      const paperHref = o.links?.paper ?? (p.doi ? `https://doi.org/${p.doi}` : null);
      if (paperHref) links.push({ label: 'Paper', href: paperHref });
      if (arxiv) links.push({ label: 'arXiv', href: `https://arxiv.org/abs/${arxiv}` });
      if (o.links?.code) links.push({ label: 'Code', href: o.links.code });
      return {
        id: p.id,
        title: o.title ?? p.title,
        authors: p.authors.map(fixName),
        year,
        date: p.date ?? `${year}`,
        venue: o.venue ?? (status === 'preprint' ? 'Preprint' : p.venue),
        status,
        citations: p.citations + (extraCitations.get(p.id) ?? 0),
        links,
        tags: o.tags ?? [],
        summary: o.summary,
        note: o.note,
      };
    })
    .sort((a, b) => b.year - a.year || b.date.localeCompare(a.date));
}

export const publications = build();

/** Papers for the home page: the newest ones plus the most cited ones (no repeats). */
export function selected() {
  const nRecent = overrides.selected?.recent ?? 2;
  const nCited = overrides.selected?.mostCited ?? 2;
  const recent = publications.slice(0, nRecent);
  const cited = [...publications]
    .filter((p) => !recent.includes(p) && p.citations > 0)
    .sort((a, b) => b.citations - a.citations)
    .slice(0, nCited);
  return [
    ...recent.map((p) => ({ ...p, badge: 'Recent' as const })),
    ...cited.map((p) => ({ ...p, badge: 'Most cited' as const })),
  ];
}

export const allTags = [...new Set(publications.flatMap((p) => p.tags))];

/** Splits an author list around your name so it can be highlighted. */
export function splitAuthors(authors: string[]) {
  const i = authors.indexOf(me);
  if (i < 0) return { before: authors.join(', '), mine: '', after: '' };
  return {
    before: authors.slice(0, i).join(', ') + (i > 0 ? ', ' : ''),
    mine: me,
    after: (i < authors.length - 1 ? ', ' : '') + authors.slice(i + 1).join(', '),
  };
}
