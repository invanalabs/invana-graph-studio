import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [
    react({
      'jsxRuntime': 'classic'
    }),
    dts({
      include: ['src/**/*'],
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@invana/ui": path.resolve(__dirname, "../ui/src"),
      "@invana/ui/*": path.resolve(__dirname, "../ui/src/*"),

    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: "FlowCanvas",
      formats: ['es', 'umd'],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime',
        },
        exports: 'named'
      }
    },
    target: 'esnext',
    sourcemap: true,
    cssCodeSplit: false,
    cssMinify: true
  }
})
