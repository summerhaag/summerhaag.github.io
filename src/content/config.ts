import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// ── Papers ──────────────────────────────────────────────────────────────────
// One markdown file per paper in src/content/papers/.

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    authors:  z.string(),
    abstract: z.string(),
    date:     z.coerce.date(),
    journal:  z.string().optional(),
    url:      z.string().url().optional(),
    arxiv:    z.string().url().optional(),
    press:    z.object({
      name: z.string(),
      url:  z.string().url(),
    }).optional(),
  }),
});

// ── Demos ────────────────────────────────────────────────────────────────────
// Interactive code demos shown in the Gallery section.

const demos = defineCollection({
  loader: file('src/content/demos.json'),
  schema: z.object({
    title:           z.string(),
    description:     z.string(),
    src:             z.string(),
    collectionHref:  z.string().optional(),
  }),
});

// ── Illustrations ────────────────────────────────────────────────────────────
// Static images shown in the Gallery section.

const illustrations = defineCollection({
  loader: file('src/content/illustrations.json'),
  schema: z.object({
    src:   z.string(),
    title: z.string(),
    alt:   z.string(),
  }),
});

// ── Talks ────────────────────────────────────────────────────────────────────
// One markdown file per talk in src/content/talks/.
// The abstract lives in the frontmatter; the markdown body is available for
// extended notes if needed.

const talks = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    venue:    z.string(),
    location: z.string(),
    date:     z.coerce.date(),
    slides:   z.string().optional(),
    abstract: z.string().optional(),
  }),
});

// Courses are stored as a plain JSON file at src/data/courses.json
// and imported directly — no content collection needed.

export const collections = { papers, demos, illustrations, talks };
