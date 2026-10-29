// Loads and sorts site content so every page shows it the same way.
import { getCollection } from 'astro:content';
import { galleryCategories } from '../content/config';

export async function getPaperGroups() {
	const papers = await getCollection('papers');
	// Newest first; papers without a date go to the top of their list
	const time = (p: (typeof papers)[number]) => p.data.date?.valueOf() ?? Infinity;
	const sorted = papers.sort((a, b) => time(b) - time(a));
	const status = (p: (typeof papers)[number]) => p.data.status ?? 'published';
	return [
		{ id: 'published',   heading: 'Published Papers',          label: '',            items: sorted.filter((p) => status(p) === 'published') },
		{ id: 'in-progress', heading: 'Papers in Progress',        label: 'In progress', items: sorted.filter((p) => status(p) === 'in-progress') },
		{ id: 'unpublished', heading: 'Unpublished Works & Notes', label: 'Unpublished', items: sorted.filter((p) => status(p) === 'unpublished') },
	].filter((g) => g.items.length > 0);
}

export type PaperGroup = Awaited<ReturnType<typeof getPaperGroups>>[number];

export async function getTalks() {
	return (await getCollection('talks')).sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

// Turns a category name into a URL-friendly id, e.g. "Ford circles" → "ford-circles"
export const slugify = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

// How a category name is shown on the site
export const displayCategory = (category: string) => category.replace('O_K', '𝒪_K');

export async function getGallerySections() {
	const illustrations = await getCollection('illustrations');
	return galleryCategories
		.map((category) => ({ category, id: slugify(category), items: illustrations.filter((i) => i.data.category === category) }))
		.filter((section) => section.items.length > 0);
}

export async function getDemos() {
	return getCollection('demos');
}
