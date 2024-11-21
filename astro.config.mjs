import { defineConfig } from 'astro/config';
import github from '@astrojs/github';

export default defineConfig({
  output: 'static',
  integrations: [github()],
  base: '/', // Use '/' since it's a direct GitHub Pages repository
});
