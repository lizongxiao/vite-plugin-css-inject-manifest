import { defineConfig } from 'vite'
import { cssInjectPlugin } from '../src'

export default defineConfig({
  plugins: [
    cssInjectPlugin({
      debug: true,
      cssPattern: /\.css$/,
      targetScripts: ['content']
    })
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        'content-scripts': 'src/content-scripts.js',
        'main': 'src/main.js'
      },
      output: {
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.css')) {
            return 'css/[name][extname]'
          }
          return '[name][extname]'
        }
      }
    }
  }
}) 