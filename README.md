# Makayla Cheng — Bioengineering Portfolio

A static HTML, CSS, and JavaScript bioengineering portfolio: minimal homepage, categorized project thumbnails, and individual project pages.

Live site: https://mmaks-code.github.io/makayla-cheng-portfolio/

## Preview locally

From this folder:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

Alternatively, use the Live Server extension in VS Code or Cursor and open `index.html`.

## Site structure

| Page | File |
| --- | --- |
| Home | `index.html` |
| Projects | `projects.html` |
| Resume | `resume.html` |
| About Me | `about.html` |
| Project details | `spectrophotometer.html` and the other seven project files |

Shared layout and styles live in `style.css`. Navigation is repeated in each HTML file so the site works without a backend.

## Files to edit when adding content

### Project names, categories, and write-ups

Edit **`js/projects-data.js`**.

- Change a project title, category, or image path in the `projects` array.
- Add or remove an object in a project's `sections` array to show or hide that heading on the detail page.
- Add a new project: copy an existing object, give it a new `slug`, add matching image files, and copy one of the project HTML files with the new slug in `data-project` and the filename.
- Add a documentation link by filling the `documentation` array: `{ href: "...", label: "..." }`.

After changing a slug, rename the corresponding `.html` file and image folder so they match.

### Photos and CAD

| What | Where |
| --- | --- |
| Home and About portrait | `assets/images/portrait/makayla-portrait.svg` (replace with `.jpg` or `.png`, then update the `src` in `index.html` and `about.html`, and `person.portrait` in `js/projects-data.js`) |
| Project thumbnails and detail images | `assets/images/projects/<project-slug>/` |
| Resume PDF | `assets/resume/resume.pdf` |

Each project folder currently contains labeled SVG placeholders:

- `thumbnail.svg` — Projects page grid
- `hero.svg` — top of the project page
- `cad.svg`, `prototype.svg`, `diagram.svg`, `testing.svg` — media section

Keep the same filenames, or change the paths in `js/projects-data.js`. Prefer consistent landscape photos (about 4:3 for thumbnails) so the grid stays even.

### About page text

Edit **`about.html`** to replace the italic placeholder notes with skills, activities, and a longer bio.

### Visual style

Edit **`style.css`**. Colors are at the top in `:root` (`--bg`, `--ink`, `--accent`).

## Deploy

The site is static and can be published to GitHub Pages, Netlify, or Cloudflare Pages.

1. Push this folder to a GitHub repository.
2. GitHub Pages: Settings → Pages → Deploy from the `main` branch, folder `/` (root).
3. Netlify or Cloudflare Pages: connect the same repository and use the root directory with no build command.

After you add `assets/resume/resume.pdf`, the Resume page viewer and Download button will use that file automatically.

Project write-ups currently contain labeled placeholders only. Replace those before sharing the site with employers.
