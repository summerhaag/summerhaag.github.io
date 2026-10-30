# Site Update Workflows

After any change, commit and push to deploy:
```bash
git add <files>
git commit -m "description"
git push
```
GitHub Actions will rebuild and redeploy automatically (~2 min).

---

## Site Structure

| Page | File | Shows |
|------|------|-------|
| Home `/` | `src/pages/index.astro` | Banner, About Me, previews (2 newest papers, 2 newest talks, 3 gallery images) |
| Research `/research` | `src/pages/research.astro` | All papers, in three lists |
| Talks `/talks` | `src/pages/talks.astro` | All talks |
| Teaching `/teaching` | `src/pages/teaching.astro` | All courses |
| Gallery `/gallery` | `src/pages/gallery.astro` | One card per image section + interactive demos |
| Gallery section `/gallery/<section>` | `src/pages/gallery/[section].astro` | All images in one section |

**What each page shows:**
- **Home:** banner and About Me, then three previews.
  - **Recent Papers:** the 2 newest published papers, an "All research →" button, and links to the in-progress and unpublished lists.
  - **Recent Talks:** the 2 newest talks, with an "All talks →" button.
  - **Gallery:** the interactive parameter-space card and the first 2 section cards, with links to the gallery and the parameter-space demo.
- **Research:** all papers in three lists (Published Papers, Papers in Progress, Unpublished Works & Notes). Buttons at the top jump to each list and show how many papers it has.
- **Talks / Teaching:** the full lists.
- **Gallery:** an "Interactive" card for the parameter space, then one card per section (cover image + name). Clicking a card opens a page with every image in that section, with links to the previous/next section. Interactive Code demos are below the cards.

**Menu:** Research (its dropdown jumps to each list on the Research page), Talks, Teaching, and Gallery each open their own page. The page you're on is highlighted. About goes back to the home page.

The menu and footer are in `src/components/Nav.astro` and `Footer.astro`. Styles: colors/fonts in `src/styles/theme.css`, everything else in `src/styles/site.css`.

You don't need to touch these files to add content — the sections below are all you need. Previews update automatically.

**If the dev server shows missing or stale content** (especially after editing `src/content/config.ts`): stop it, delete the cache, restart:
```bash
rm -f .astro/data-store.json && npm run dev
```

---

## Papers

Add a new file to `src/content/papers/`. Use an existing file as a template.

```
src/content/papers/my-paper-2026.md
```

```markdown
---
title: "Paper Title"
authors: "Author One, Author Two"
abstract: "Abstract text here."
date: 2026-01-15
journal: "Journal Name"          # optional
url: https://link-to-paper.com   # optional
arxiv: https://arxiv.org/abs/... # optional
---
```

Papers are sorted by date automatically (newest first).

### Which list a paper appears in

Under Research there are three lists, each with a link in the Research dropdown menu. Set `status` in the frontmatter:

| `status`        | Shown under                 | Notes |
|-----------------|-----------------------------|-------|
| *(leave out)*   | Published Papers            | default; `date` is required |
| `in-progress`   | Papers in Progress          | `date` and `abstract` optional |
| `unpublished`   | Unpublished Works & Notes   | `date` and `abstract` optional |

A list only appears once it has at least one paper.

In-progress example:
```markdown
---
title: "Working Title"
authors: "Author One, Author Two"
status: in-progress
---
```

Unpublished notes with a PDF: copy the PDF into `public/papers/` and set `pdf`:
```bash
cp /path/to/notes.pdf public/papers/notes.pdf
```
```markdown
---
title: "Notes Title"
authors: "Summer Haag"
date: 2026-10-01
status: unpublished
pdf: "/papers/notes.pdf"        # shows a "PDF" link
abstract: "Short description."  # optional
---
```

When a paper is published: delete the `status` line, add `date` and `journal` / `url` / `arxiv`.

Long abstracts are cut to three lines on the site with a "Show more" button, so pasting the full abstract is fine.

---

## Talks

Add a new file to `src/content/talks/`. Use an existing file as a template.

```
src/content/talks/conference-2026.md
```

```markdown
---
title: "Talk Title"
venue: "Conference or Seminar Name"
location: "City, State/Country"
date: 2026-03-01
slides: "/slides/my-slides.pdf"  # optional — see Slides section
abstract: "Optional abstract."   # optional
---
```

Talks are sorted by date automatically (newest first).

---

## Slides

Copy your slide file into `public/slides/`:
```bash
cp /path/to/my-slides.pdf public/slides/my-slides.pdf
# or for HTML slides:
cp /path/to/my-slides.html public/slides/my-slides.html
```

Then reference it in the talk's frontmatter as `/slides/my-slides.pdf`.

---

## Gallery Images

Add image files to `public/illustrations/gallery/`. Shrink big ones to web size first (the original stays untouched):
```bash
cp /path/to/image.png public/illustrations/gallery/image.png
sips -Z 1600 public/illustrations/gallery/image.png   # max 1600px on the long side
```

Then add an entry to `src/content/illustrations.json`:
```json
{ "id": "unique-id", "category": "Ford circles", "src": "/illustrations/gallery/image.png", "title": "Image Title", "alt": "Description of the image" }
```

`category` must be exactly one of:
- `"Integral Apollonian circle packings"`
- `"O_K-integral Apollonian circle packings"` (shown on the site as 𝒪_K)
- `"Schmidt arrangements and super packings"`
- `"Ford circles"`
- `"Parameter space"`
- `"Diagrams"`
- `"Error images"`

A section only appears once it has at least one image. To add or rename sections, edit `galleryCategories` in `src/content/config.ts`.

The Gallery page shows one card per section; clicking it opens that section's page (e.g. `/gallery/ford-circles`) with all its images. To choose a section's card image, add `"cover": true` to one image in that section:
```json
{ "id": "ford-circles", "category": "Ford circles", "src": "...", "title": "...", "alt": "...", "cover": true }
```
If no image in a section has `"cover": true`, the first one is used. The home page preview shows the first 3 section cards.

Images appear within their section in the order listed in the JSON file.

### Crediting images made by others

If an image was made by someone else, or made with someone else's code, add a `credit` to its entry:
```json
{ "id": "...", "category": "...", "src": "...", "title": "...", "alt": "...",
  "credit": { "type": "code", "by": "Name", "url": "https://their-page-or-repo" } }
```
- `type`: `"image"` shows **Image by Name**; `"code"` shows **Made with code by Name**; `"paper"` shows **From Name** (use `by` for author + title, e.g. `"James Rickards, “The Apollonian staircase”"`)
- `by`: the person, group, or project
- `url`: optional — makes the name a link (their website, paper, or GitHub repo)

The credit appears in small italics under the image's caption. To change a caption, edit `title` (and `alt`, the description for screen readers).

The note about AI-assisted images and images made by others is at the top of `src/pages/gallery.astro`. Clicking opens the full image in a new tab.

---

## CV

Edit `cv/cv.tex` in the project, then compile and push:

**Locally** (preview before pushing):
```bash
npm run compile:cv
```

**To update the live site:** just commit and push `cv/cv.tex` — GitHub Actions compiles it automatically on every deploy.

---

## Demos (non-shader)

Add an entry to `src/content/demos.json`:
```json
{
  "id": "unique-id",
  "title": "Demo Title",
  "description": "What the demo shows.",
  "src": "https://summerhaag.github.io/shaders-public/shader-name/",
  "collectionHref": "/demos/my-page"   // optional — only if there's a dedicated page
}
```

To give a demo a card at the top of the Gallery (and on the home page preview), add a `thumbnail` image. This only works for demos that have a `collectionHref` page:
```json
"thumbnail": "/illustrations/gallery/acp-parameter-space2.png"
```
The card shows an "Interactive" badge and links to the `collectionHref` page.

---

## Shaders

### Build a shader locally
```bash
cd /Users/summerhaag/shaders
npm run rebuild -- shader-name
```

### Publish a shader to the live site
```bash
cd /Users/summerhaag/shaders
./deploy-public.sh shader-name
```

You can deploy multiple at once:
```bash
./deploy-public.sh shader-one shader-two shader-three
```

After deploying, the shader is live at `https://summerhaag.github.io/shaders-public/shader-name/`.

### Add a new shader to the website gallery
1. Deploy it with `deploy-public.sh` (above)
2. Add an entry to `src/content/demos.json` with the shaders-public URL
3. Commit and push

### Add a parameter-space variant
1. Build and deploy it (above)
2. Add an entry to `src/data/parameter-space-variants.json` with `"built": true` and a `"description"` (shown in the sidebar when the variant is selected)
3. Commit and push

Variants with `"built": false` are hidden from the parameter-space page.

### Credit to Steve Trettel
The shaders are built with Steve Trettel's [Shader Sandbox](https://github.com/stevejtrettel/shader-sandbox). The thank-you note appears in three places:
- the bottom of the parameter-space sidebar (`src/pages/demos/parameter-space.astro`)
- above the Interactive Code demos in the Gallery (`src/components/ShaderCredit.astro`)
- the "Interactive" card (`src/components/GallerySectionCards.astro`)

---

## Courses (Teaching)

Edit `src/data/courses.json`. Each entry is one row in the teaching table:

```json
{ "title": "Calculus I", "semester": "Fall", "year": 2026, "role": "Instructor" }
```

- `semester`: `"Fall"`, `"Spring"`, or `"Summer"`
- `role`: `"Instructor"` or `"TA"`

Courses appear in the order listed — add new ones at the bottom.

---

## Profile Photo

Replace `public/profile.jpeg`:
```bash
cp /path/to/new-photo.jpeg public/profile.jpeg
```

---

## Browser Tab Icon (Favicon)

Make a square crop of your image and save three sizes into `public/`:
```bash
sips -c 900 900 /path/to/image.png --out /tmp/square.png   # crop to square (use the smaller side)
sips -z 32 32   /tmp/square.png --out public/favicon-32.png
sips -z 512 512 /tmp/square.png --out public/favicon.png
sips -z 180 180 /tmp/square.png --out public/apple-touch-icon.png
```

Browsers cache favicons heavily — if the old one still shows after deploying, hard-refresh or open the site in a private window.
