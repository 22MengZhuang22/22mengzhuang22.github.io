import { defineConfig } from 'astro/config';
import remarkLangBlocks from './remark-lang-blocks.mjs';

export default defineConfig({
  site: 'https://22mengzhuang22.github.io',
  base: '/',
  markdown: {
    remarkPlugins: [remarkLangBlocks],
  },
});
