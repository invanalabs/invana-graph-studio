import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, 'src'),
      "@invana/ui": path.resolve(__dirname, '../../packages/ui/src'),
      "@/lib": path.resolve(__dirname, '../../packages/ui/src/lib')
    },
  }
})
