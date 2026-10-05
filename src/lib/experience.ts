import { getCollection, type CollectionEntry } from 'astro:content';

type Experience = CollectionEntry<'experience'>;

// Entries with `order` come first (1, 2, …); the rest are newest first by start
// date, with ongoing roles ahead of finished ones that started the same month.
const byDate = (a: Experience, b: Experience) =>
  b.data.start.localeCompare(a.data.start) || (b.data.end ?? '9999-12').localeCompare(a.data.end ?? '9999-12');

export async function sortedExperience(): Promise<Experience[]> {
  return (await getCollection('experience')).sort((a, b) => {
    const pa = a.data.order ?? Infinity;
    const pb = b.data.order ?? Infinity;
    return pa !== pb ? pa - pb : byDate(a, b);
  });
}
