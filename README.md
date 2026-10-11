# Lyrak — digital artist & 2D animator

A static artist portfolio built with Astro and Tailwind CSS. The gallery is pre-rendered from [`src/data/portfolio.json`](src/data/portfolio.json): to add a piece, place its image under `public/images/` and add a data entry. No component edits are needed.

## Run locally

Requirements: Node.js 20.3+ and npm.

```bash
npm install
npm run dev
```

Astro prints the local URL (usually `http://localhost:4321`). Check the production build with:

```bash
npm run build
npm run preview
```

The static output is written to `dist/`.

## Add artwork

1. Copy an optimized image into `public/images/`.
2. Add an entry to `src/data/portfolio.json`:

   ```json
   {
     "title": "New piece",
     "category": "Full Render",
     "image": "images/new-piece.webp",
     "alt": "A short description of the artwork.",
     "medium": "Digital illustration"
   }
   ```

Categories: `Lineless`, `Full Render`, `Sketch`, `Animation`, and `Previous Commissions`. Category labels and order are maintained in `src/data/categories.ts`.

### Add an animation film

Place an MP4 and a poster image in `public/images/`, then add:

```json
{
  "title": "Animation film",
  "category": "Animation",
  "image": "images/animation-poster.jpg",
  "alt": "A short description of the poster frame.",
  "medium": "Animation film",
  "animation": {
    "src": "images/animation-film.mp4",
    "type": "video/mp4",
    "alt": "A short description of the animation."
  }
}
```

The gallery shows the poster with a play button until the visitor clicks. The film then opens in a lightbox with normal playback controls and sound. Compress video for web before adding it: GitHub blocks individual files over 100 MB, and large media slows the portfolio for every visitor. Two web-sized animation films are already in place at about 5–7 MB each.

## Content to edit

- Artwork and category assignments: `src/data/portfolio.json`
- Category labels/order: `src/data/categories.ts`
- Social profiles, booking URL, contact email: `src/data/socials.ts`
- About copy: `src/pages/about.astro`
- Commission copy: `src/pages/commissions.astro` (draft; confirm prices, terms and contact details before use)

## Deploy to GitHub Pages

This repository is configured for `https://lyrak-i.github.io/website_portofolio_art/`.

1. Push the project to the `main` branch of `lyrak-i/website_portofolio_art`.
2. On GitHub, open **Settings → Pages** and set **Source** to **GitHub Actions**.
3. The `.github/workflows/deploy.yml` workflow builds Astro and deploys `dist/` on each push to `main` or `master`. Follow progress in the repository's **Actions** tab.

To push local changes:

```bash
git add .
git commit -m "Add portfolio artwork"
git push origin main
```

If you rename the repository, change `SITE_BASE` in `.github/workflows/deploy.yml` and `astro.config.mjs` to match the new repository name.
