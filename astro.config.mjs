import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fantactics.github.io',
  base: '/setouchi-cultural-economic-atlas',
  integrations: [sitemap()]
});
