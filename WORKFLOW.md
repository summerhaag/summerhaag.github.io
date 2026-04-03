# Site Update Workflows

After any change, commit and push to deploy:
```bash
git add <files>
git commit -m "description"
git push
```
GitHub Actions will rebuild and redeploy automatically (~2 min).

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

Add image files to `public/illustrations/`:
```bash
cp /path/to/image.jpg public/illustrations/image.jpg
```

Then add an entry to `src/content/illustrations.json`:
```json
{ "id": "unique-id", "src": "/illustrations/image.jpg", "title": "Image Title", "alt": "Description of the image" }
```

Images appear in the gallery in the order listed in the JSON file. Clicking opens the full image in a new tab.

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
2. Add an entry to `src/data/parameter-space-variants.json` with `"built": true`
3. Commit and push

Variants with `"built": false` are hidden from the parameter-space page.

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
