import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// v2/vite.config.ts
export default defineConfig({
  plugins: [react()],
  base: '/touchthesky/', // This ensures v2 looks for assets at the root URL
})