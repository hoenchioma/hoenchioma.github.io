import type { CollectionEntry } from 'astro:content';
import { ordered } from './ordered';

type Group = CollectionEntry<'achievements'>['data']['group'];

const LABELS: Record<Group, string> = {
  academic: 'Academic',
  'competitive-programming': 'Competitive Programming',
  hackathons: 'Hackathons',
  ctf: 'CTF / Security',
};

/** Achievement groups laid out in three columns; hackathons and CTF share the last one. */
export async function groups({ homeOnly = false } = {}) {
  const all = await ordered('achievements');
  const items = homeOnly ? all.filter((a) => a.data.home) : all;
  const make = (g: Group) => ({ id: g, label: LABELS[g], items: items.filter((a) => a.data.group === g) });
  const list = (Object.keys(LABELS) as Group[]).map(make).filter((g) => g.items.length > 0);
  const find = (id: Group) => list.filter((g) => g.id === id);
  return {
    total: items.length,
    columns: [find('academic'), find('competitive-programming'), [...find('hackathons'), ...find('ctf')]].filter((c) => c.length),
  };
}

export async function moments() {
  return (await ordered('achievements')).filter((a) => a.data.photo);
}

export const groupLabel = (g: Group) => LABELS[g];
