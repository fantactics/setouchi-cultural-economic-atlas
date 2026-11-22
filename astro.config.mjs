import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://fantactics.github.io',
  base: '/setouchi-cultural-economic-atlas',
  integrations: [sitemap({
    filter: (url) => !['/book/kojima-island-when-ruins-are-not-a-problem/','/book/after-the-solar-farm/','/editorial-methodology/','/research-workflow/','/methodology/','/kii/'].some((path)=>url.includes(path))
  })]
});
