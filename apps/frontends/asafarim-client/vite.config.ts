import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import vitePluginMd from 'vite-plugin-md';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    vitePluginMd({
      markdownItOptions: {
        html: true,
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@mdfiles': path.resolve(__dirname, '../../../docs'),
    },
  },
  define: {
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      VITE_API_URL: JSON.stringify('http://localhost:5000')
    }
  },
  server: {
    port: 5173,
    open: true,
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
});
