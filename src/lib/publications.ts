import { parse } from 'yaml';
import cache from '../data/publications.cache.json';
import overridesRaw from '../data/publications.overrides.yaml?raw';

type Status = 'published' | 'accepted' | 'preprint';

interface Override {
  hide?: boolean;
  mergeInto?: string;
  title?: string;
  venue?: string;
  year?: number;
  status?: Status;
  links?: { code?: string; arxiv?: string; paper?: string };
  tags?: string[];
  summary?: string;
  note?: string;
}

interface Overrides {
  authorNames?: Record<string, string>;
  me: string;
  selected?: { recent?: number; mostCited?: number };
  papers?: Record<string, Override>;
}

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

export const overrides = parse(overridesRaw) as Overrides;
export const me = overrides.me;

function build(): Publication[] {
  const curated = overrides.papers ?? {};
  const fixName = (n: string) => overrides.authorNames?.[n] ?? n;
  const extraCitations = new Map<string, number>();
  for (const p of cache.papers) {
    const target = curated[p.id]?.mergeInto;
    if (target) extraCitations.set(target, (extraCitations.get(target) ?? 0) + p.citations);
  }

  return cache.papers
    .filter((p) => !curated[p.id]?.hide && !curated[p.id]?.mergeInto)
    .map((p) => {
      const o = curated[p.id] ?? {};
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
        year: o.year ?? p.year ?? 0,
        date: p.date ?? `${p.year}`,
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
