import { getCollection } from 'astro:content';

/** Ids ("<phase-slug>/<chapter-slug>") of chapters that have been written. */
export async function getReadyIds(): Promise<Set<string>> {
  const entries = await getCollection('chapters');
  return new Set(entries.map((e) => e.id));
}

/** Rough reading time for simple-English readers (about 180 words per minute). */
export function readingMinutes(body = ''): number {
  const text = body
    .replace(/^import .*$/gm, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ');
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 180));
}
