import { getCollection, type CollectionEntry } from 'astro:content';

type Experience = CollectionEntry<'experience'>;

// Newest first by start date, with ongoing roles ahead of finished ones that started the same month.
const byDate = (a: Experience, b: Experience) =>
  b.data.start.localeCompare(a.data.start) || (b.data.end ?? '9999-12').localeCompare(a.data.end ?? '9999-12');

/**
 * Experience in display order: newest first, adjusted by each entry's optional
 * `before: <id>` / `after: <id>`. These only fix relative order (A above B); every
 * other entry keeps its date position. Unknown ids and cycles fail the build.
 */
export async function sortedExperience(): Promise<Experience[]> {
  const entries = (await getCollection('experience')).sort(byDate);
  const ids = new Set(entries.map((e) => e.id));

  // Edge a -> b means a must be listed above b.
  const above = new Map<string, Set<string>>(entries.map((e) => [e.id, new Set()]));
  for (const e of entries) {
    for (const [key, target] of [['before', e.data.before], ['after', e.data.after]] as const) {
      if (!target) continue;
      if (target === e.id || !ids.has(target)) {
        throw new Error(`experience.yaml: ${e.id} has ${key}: ${target}, which ${target === e.id ? 'is itself' : 'is not an entry id'}`);
      }
      const [first, second] = key === 'before' ? [e.id, target] : [target, e.id];
      above.get(second)!.add(first);
    }
  }

  // Topological sort that always takes the earliest-by-date entry whose constraints are met.
  const result: Experience[] = [];
  const placed = new Set<string>();
  while (result.length < entries.length) {
    const next = entries.find((e) => !placed.has(e.id) && [...above.get(e.id)!].every((id) => placed.has(id)));
    if (!next) {
      const left = entries.filter((e) => !placed.has(e.id)).map((e) => e.id);
      throw new Error(`experience.yaml: before/after rules form a cycle among ${left.join(', ')}`);
    }
    result.push(next);
    placed.add(next.id);
  }
  return result;
}
