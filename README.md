# aneeshkrishna4739.github.io

Personal research portfolio for **Aneesh Krishna** — PhD student in Computational and
Data-Enabled Sciences at the University at Buffalo (SUNY).

A single-page, static site (plain HTML + CSS + vanilla JS). No build step, no framework.

## Structure

```
index.html          # all page content
styles.css          # design system + layout (light/dark themes)
script.js           # theme toggle, mobile nav, scroll-spy, reveal-on-scroll
assets/
  img/              # portrait, presentation & poster photos, logos, favicon
  docs/             # CV and SIAM LS26 poster (PDF)
```

## Preview locally

```bash
python -m http.server 8000
# then open http://localhost:8000
```

## Deploy

This repo publishes via **GitHub Pages** from the `main` branch. Pushing to `main`
updates the live site at https://aneeshkrishna4739.github.io/.

## Editing notes

- **News**: edit the `#news` list in `index.html` (newest first).
- **Publications**: edit the `#publications` lists; keep the author list with
  `<strong>Aneesh Krishna</strong>` bolded.
- **Photos**: drop replacements into `assets/img/` (keep them web-sized — long edge
  ≤ ~1600px). Update the `src`/`width`/`height` in `index.html` if filenames change.
- **Accent color / theme**: change the CSS custom properties at the top of `styles.css`
  (`--accent`, backgrounds, etc.) — both light and dark palettes live there.
