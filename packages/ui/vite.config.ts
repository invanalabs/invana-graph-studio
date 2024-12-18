import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import * as path from 'path';
import dts from "vite-plugin-dts";
// import { peerDependencies, dependencies } from './package.json'


// https://vite.dev/config/
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
      // "@invana/ui": path.resolve(__dirname, "src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src', 'index.ts'),
      name: "InvanaUI",
      formats: ['es', 'umd'],
      fileName: (ext) => `index.${ext}.js`,
    },
    rollupOptions: {
      // dont include dependencies and peerDependencies in the bundle
      external: ['react', 'react-dom', 'react/jsx-runtime'], // Peer dependencies
      // external: [...Object.keys(peerDependencies), ...Object.keys(dependencies)],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'react/jsx-runtime': 'jsxRuntime', // Add the global variable for the runtime
        },
        //  preserveModules: true,
        //  inlineDynamicImports: false,
         exports: 'named'
        }
    },

    target: 'esnext',
    sourcemap: true
  }
})
