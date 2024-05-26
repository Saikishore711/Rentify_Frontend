import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteCompression from 'vite-plugin-compression';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    viteCompression({
      verbose: true, // Optional: set to true to see compression statistics
      disable: false, // Optional: set to true to disable compression
      threshold: 1024, // Size threshold for compression
      algorithm: 'gzip', // Can also use 'brotliCompress'
      ext: '.gz', // File extension for compressed files
    }),
  ],
});
