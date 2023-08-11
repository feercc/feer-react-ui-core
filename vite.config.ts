import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { relative } from 'path';
import glob from 'glob'

const COMPONENTS_INPUT = Object.fromEntries(
  glob.sync('src/components/**/index.tsx').map((path) => [relative('src/components', path).replace(/index\.tsx$/, 'index'), path])
)

// 结果类似： { 'Button/index': 'src/components/Button/index.tsx' }

export default defineConfig({
  json: {
    namedExports: true,
    stringify: false,
  },
  build: {
    outDir: 'lib',
    target: 'es2015',
    cssCodeSplit: true,
    cssTarget: 'chrome61',
    lib: {
      formats: ['es'],
      entry: {
        'index': 'src/index.ts',
        ...COMPONENTS_INPUT,
      },
      name: 'feer-ui',
      fileName: (format, entryName) => `${entryName}.${format}.js`,
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    }
  },
  plugins: [
    react()
  ],
})
