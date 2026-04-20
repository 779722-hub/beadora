import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://beadora.kz',
  output: 'static',
  trailingSlash: 'never',
  build: {
    assets: 'assets',
    format: 'directory',
  },
  integrations: [sitemap()],
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  vite: {
    build: {
      cssCodeSplit: true,
    },
  },
});
