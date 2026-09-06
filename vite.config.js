import { defineConfig } from 'vite';

export default defineConfig({
  base: '/small-bird-creative/',
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
  },
  server: {
    host: true,
    port: 5173,
  },
});
