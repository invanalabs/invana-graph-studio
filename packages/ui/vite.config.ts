import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from 'path';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@invana/ui": path.resolve(__dirname, "src"),
    },
  },
  build: {
      cssCodeSplit: true,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'), // Entry point of your library
        name: 'invana-ui', // Global variable name for UMD builds
        fileName: (format) => `invana-ui.${format}.js`,
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'], // Peer dependencies
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            'react/jsx-runtime': 'jsxRuntime', // Add the global variable for the runtime
          },
        },
      },
  },
})
