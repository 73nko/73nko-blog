import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.73nko.es',
  integrations: [sitemap()],
  vite: {
    plugins: [tailwindcss()],
  },
});
