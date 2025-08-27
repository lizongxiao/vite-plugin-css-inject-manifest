import { defineConfig } from 'vite'
import { cssInjectPlugin } from '../src'

export default defineConfig({
  plugins: [
    cssInjectPlugin({
      debug: true,
      cssPattern: /\.css$/,
      targetScripts: ['content-scripts']
    })
  ],
  build: {
    outDir: 'dist'
  }
}) 