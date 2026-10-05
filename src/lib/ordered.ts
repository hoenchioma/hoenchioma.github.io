import { getCollection, type CollectionKey, type CollectionEntry } from 'astro:content';
import { parse } from 'yaml';

// Astro returns file-loader entries sorted by id; keep the order they are
// written in the YAML file instead, so editing the file controls display order.
const files = import.meta.glob('../data/*.yaml', { query: '?raw', import: 'default', eager: true }) as Record<string, string>;

function fileOrder(name: string): Map<string, number> {
  const raw = files[`../data/${name}.yaml`];
  const items = (raw ? parse(raw) : []) as { id: string }[];
  return new Map((items ?? []).map((item, i) => [String(item.id), i]));
}

export async function ordered<C extends CollectionKey>(name: C): Promise<CollectionEntry<C>[]> {
  const order = fileOrder(name);
  const entries = await getCollection(name);
  return entries.sort((a, b) => (order.get(a.id) ?? 0) - (order.get(b.id) ?? 0));
}
