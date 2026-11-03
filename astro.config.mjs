import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fantactics.github.io',
  base: '/setouchi-cultural-economic-atlas',
  integrations: [sitemap({
    filter: (url) => !url.includes('/book/kojima-island-when-ruins-are-not-a-problem/')
  })]
});
