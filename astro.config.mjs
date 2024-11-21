import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  vite: {
    optimizeDeps: {
      include: ['bootstrap/dist/css/bootstrap.min.css'],
    },
    build: {
      rollupOptions: {
        external: ['bootstrap'],
      },
    },
  },
});
