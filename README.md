# Lyrak — digital artist & 2D animator

A small, static portfolio built with Astro and Tailwind CSS. It publishes to GitHub Pages; the gallery is pre-rendered from one JSON file, so adding a piece means copying in the image and adding one object—no component edits needed.

## Run locally

Requirements: Node.js 20.3+ (the GitHub Actions build uses Node 22) and npm.

```bash
npm install
npm run dev
```

Open the local URL Astro prints (usually `http://localhost:4321`).

Run the production build and preview it locally:

```bash
npm run build
npm run preview
```

The generated static site is in `dist/`.

## Add a new artwork

1. Copy the image into `public/images/`. Supported still images include `.jpg`, `.png`, `.webp`, and `.svg`.
2. Open [`src/data/portfolio.json`](src/data/portfolio.json) and add an object to the array:

   ```json
   {
     "title": "Rain at Dusk",
     "category": "Full Render",
     "image": "images/rain-at-dusk.jpg",
     "alt": "A character looking out across a rain-lit city.",
     "medium": "Digital painting",
     "year": "2026"
   }
   ```

3. Save and refresh the local site. The gallery and category filters update from the data at build time.

Categories are `Lineless`, `Full Render`, `Sketch`, `Animation`, and `Previous Commissions`. Category names are checked against `src/data/categories.ts`; a spelling mistake falls back to Sketch and is warned about during the build.

### Add an animation

For a GIF, use the GIF as `image` and skip `animation`:

```json
{
  "title": "Slow Orbit",
  "category": "Animation",
  "image": "images/slow-orbit.gif",
  "alt": "A character slowly turns in place."
}
```

For a looping MP4, include a still image as the poster and add `animation`:

```json
{
  "title": "Wind Study",
  "category": "Animation",
  "image": "images/wind-study-poster.jpg",
  "alt": "A figure's coat shifts in a light breeze.",
  "animation": {
    "src": "images/wind-study.mp4",
    "type": "video/mp4",
    "alt": "A short loop of a figure's coat moving in the wind."
  }
}
```

Videos play muted, inline, and in a loop. The poster is shown while the clip loads and in the enlarged artwork viewer. Keep files optimized for web; MP4 is usually smaller than GIF for the same footage. Animation respects the system's reduced-motion preference in the rest of the interface; the preview itself is muted and optional.

## Edit the content

- Art: [`src/data/portfolio.json`](src/data/portfolio.json)
- Category names/order and descriptions: [`src/data/categories.ts`](src/data/categories.ts)
- Social links and booking details: [`src/data/socials.ts`](src/data/socials.ts)
- About copy: [`src/pages/about.astro`](src/pages/about.astro)
- Commission draft copy and policy outline: [`src/pages/commissions.astro`](src/pages/commissions.astro)
- Shared site navigation/layout: `src/components/` and `src/layouts/`

The commission page is clearly marked as draft. Confirm and replace the sample contact email, pricing, delivery estimates, rights, policies and availability before taking paid requests.

## Deploy to GitHub Pages

This project is configured as a **project site** at:

`https://lyrak3o6.github.io/website_portofolio_art/`

The repository name and `SITE_BASE` must match. If you rename the repo, change the default in `astro.config.mjs` and the `SITE_BASE` value in `.github/workflows/deploy.yml` to the new name, including its leading `/`. If your GitHub username or organization differs, change `SITE_URL` in both places as well. For a user site repository named `lyrak3o6.github.io`, set `SITE_BASE` to `/`.

1. Create a GitHub repository named `website_portofolio_art` under `lyrak3o6` (or update the configuration if using another owner/repo).
2. From this project directory, initialize Git, commit the files, add the remote, and push:

   ```bash
   git init
   git add .
   git commit -m "Create Lyrak artist portfolio"
   git branch -M main
   git remote add origin https://github.com/lyrak3o6/website_portofolio_art.git
   git push -u origin main
   ```

3. In the repository on GitHub, open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and deploys on every push to `main` or `master`, and can also be run manually from the repository's **Actions** tab.
5. Once the Pages deployment finishes, visit `https://lyrak3o6.github.io/website_portofolio_art/`.

To deploy a different repo, replace `website_portofolio_art` in `astro.config.mjs`, `.github/workflows/deploy.yml`, and the commands above with that repository's exact name.
