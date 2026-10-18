import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@photos': fileURLToPath(new URL('./immagini', import.meta.url))
    }
  },
  build: {
    // photos are already compressed; keep them as separate hashed files
    assetsInlineLimit: 0
  },
  test: {
    environment: 'jsdom',
    include: ['tests/**/*.spec.js']
  }
})
