import { defineConfig, type Plugin } from "vite";
import { manifestBuilderPlugin } from "../src";

export default defineConfig({
  plugins: [
    manifestBuilderPlugin({
      debug: true,
      cssPattern: /\.css$/,
      targetScripts: ["content"],
      manifestOverrides: {
        description: "这是一个通过构建时动态修改的扩展描述",
        version: "1.0.1",
        name: "动态配置的扩展名称",
      },
    }) as Plugin,
  ],
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        "content-scripts": "src/content-scripts.js",
        main: "src/main.js",
      },
      output: {
        entryFileNames: "[name].js",
        chunkFileNames: "[name].js",
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "css/[name][extname]";
          }
          return "[name][extname]";
        },
      },
    },
  },
});
