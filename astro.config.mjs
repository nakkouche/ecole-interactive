import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://nakkouche.github.io',
  base: '/ecole-interactive',
  integrations: [
    svelte(),
    tailwind()
  ],
  vite: {
    optimizeDeps: {
      exclude: ['svelte']
    }
  }
});
