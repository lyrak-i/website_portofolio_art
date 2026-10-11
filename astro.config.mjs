import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// Set SITE_URL to your published origin and SITE_BASE to your repository name.
const site = process.env.SITE_URL ?? 'https://lyrak-i.github.io';
const base = process.env.SITE_BASE ?? '/website_portofolio_art';

export default defineConfig({
  site,
  base,
  output: 'static',
  vite: {
    plugins: [tailwindcss()],
  },
});
