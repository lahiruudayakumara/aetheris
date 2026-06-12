import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react(),
    tailwindcss()
  ],
  server: {
    fs: {
      allow: [
        // Allow serving files from the website project directory
        '.',
        // Allow serving files from the sibling docs directories
        '..'
      ]
    }
  }
})
