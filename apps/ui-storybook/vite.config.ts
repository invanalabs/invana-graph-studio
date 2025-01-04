import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@invana/ui": path.resolve(__dirname, '../../packages/ui/src'),
      "@invana/config-tailwind": path.resolve(__dirname, '../../packages/config-tailwind/tailwind.config.js'),

      // "@/lib": path.resolve(__dirname, '../../packages/ui/src/lib')
    },
  }
})
