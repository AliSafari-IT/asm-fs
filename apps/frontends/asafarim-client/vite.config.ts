import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../../../dist/asafarim-client', // Relative to the frontend app's directory
    emptyOutDir: true, // Cleans the directory before build
  },
})
