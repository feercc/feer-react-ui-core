import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { relative } from 'path';
// 将css打包进js，防止再次引用 css 文件，但是对于组建来说会造成频繁的引用，所以不要用这个，直接打包到一个 css 文件中
// import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
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
    cssTarget: 'chrome61',
    cssCodeSplit: false,
    lib: {
      name: 'feer-react-ui-core',
      formats: ['es'],
      entry: {
        'index': 'src/index.ts',
        ...COMPONENTS_INPUT,
      },
      fileName: (format, entryName) => {
        return `${entryName}.${format}.js`
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
    }
  },
  plugins: [
    react(),
    // cssInjectedByJsPlugin({
    //   topExecutionPriority: false,
    //   jsAssetsFilterFunction: function customJsAssetsfilterFunction(outputChunk) {
    //     return outputChunk.fileName.endsWith('.js')
    //   }
    // })
  ],
})
