import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/doha-car-repair/',
  build: {
    outDir: 'dist',
  },
  // Copy public assets
  publicDir: 'public',
})