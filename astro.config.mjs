import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/', // Use '/' for GitHub Pages unless your repository is under a subpath
});
