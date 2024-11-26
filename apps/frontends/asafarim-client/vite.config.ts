import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import vitePluginMd from 'vite-plugin-md';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vitePluginMd(),],
  css: {
    postcss: './postcss.config.cjs',
  },
  assetsInclude: ['**/*.md'],

  build: {
    outDir: '../../../dist/asafarim-client', // Relative to the frontend app's directory
    emptyOutDir: true, // Cleans the directory before build
  },
})
