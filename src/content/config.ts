import { defineCollection, z } from 'astro:content';
import { file } from 'astro/loaders';

// ── Papers ──────────────────────────────────────────────────────────────────
// One markdown file per paper in src/content/papers/.

const papers = defineCollection({
  type: 'content',
  schema: z.object({
    title:    z.string(),
    authors:  z.string(),
    abstract: z.string().optional(),
    date:     z.coerce.date().optional(),    // required for published papers; optional otherwise
    // Which list the paper appears in under Research
    status:   z.enum(['published', 'in-progress', 'unpublished']).default('published'),
    pdf:      z.string().optional(),        // path to a PDF in public/, e.g. /papers/my-notes.pdf
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
    thumbnail:       z.string().optional(),  // image for a card at the top of the Gallery (needs collectionHref)
  }),
});

// ── Illustrations ────────────────────────────────────────────────────────────
// Static images shown in the Gallery section.

export const galleryCategories = [
  'Integral Apollonian circle packings',
  'O_K-integral Apollonian circle packings',
  'Schmidt arrangements and super packings',
  'Ford circles',
  'Parameter space',
  'Diagrams',
  'Error images',
] as const;

const illustrations = defineCollection({
  loader: file('src/content/illustrations.json'),
  schema: z.object({
    category: z.enum(galleryCategories),
    src:   z.string(),
    title: z.string(),
    alt:   z.string(),
    cover: z.boolean().optional(),  // true = this image is the section's thumbnail
    // Optional: credit an image made by someone else, or made with their code
    credit: z.object({
      type: z.enum(['image', 'code', 'paper']),   // 'image' = "Image by …", 'code' = "Made with code by …", 'paper' = "From …"
      by:   z.string(),                  // person or project name
      url:  z.string().optional(),       // link to their page, paper, or repo
    }).optional(),
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
