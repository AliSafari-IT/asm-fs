import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginMd from 'vite-plugin-md';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginMd({
      mode: ['html'],
      markdownIt: {
        html: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': 'http://localhost:5000',  // Proxying backend API requests
    },
  },
  css: {
    postcss: './postcss.config.cjs',
  },
  assetsInclude: ['**/*.md'],

  build: {
    outDir: '../../../dist/asafarim-client', // Relative to the frontend app's directory
    emptyOutDir: true, // Cleans the directory before build
  },
})
