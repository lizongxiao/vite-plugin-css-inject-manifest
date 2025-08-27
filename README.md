# vite-plugin-css-inject-manifest

一个用于将 CSS 文件自动注入到 Chrome Extension 的 `manifest.json` 中的 Vite 插件，解决样式丢失的问题。

## 功能特性

- ✅ 自动检测并注入 CSS 文件到 manifest.json
- ✅ 支持自定义 CSS 文件匹配规则
- ✅ 支持选择性注入到特定的 content_scripts
- ✅ 提供调试日志功能
- ✅ 完整的 TypeScript 类型支持
- ✅ 支持多种构建格式 (CJS/ESM)

## 安装

```bash
npm install vite-plugin-css-inject-manifest
```

或者使用 yarn：

```bash
yarn add vite-plugin-css-inject-manifest
```

## 使用方法

### 基础用法

```typescript
import { defineConfig } from 'vite'
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig({
  plugins: [
    cssInjectPlugin()
  ]
})
```

### 高级配置

```typescript
import { defineConfig } from 'vite'
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig({
  plugins: [
    cssInjectPlugin({
      debug: true,
      cssPattern: /\.(css|scss|less)$/,
      targetScripts: ['content-scripts'],
      outDir: 'dist',
      manifestName: 'manifest.json'
    })
  ]
})
```

## 配置选项

### `debug?: boolean`
是否启用调试日志，默认为 `false`

```typescript
cssInjectPlugin({
  debug: true // 会输出详细的处理日志
})
```

### `cssPattern?: RegExp`
自定义 CSS 文件匹配规则，默认为 `/\.css$/`

```typescript
cssInjectPlugin({
  cssPattern: /\.(css|scss|less)$/ // 匹配 CSS、SCSS、Less 文件
})
```

### `targetScripts?: string[]`
指定要注入 CSS 的 content_scripts，默认为空数组（注入到所有脚本）

```typescript
cssInjectPlugin({
  targetScripts: ['content-scripts', 'background'] // 只注入到包含这些关键词的脚本
})
```

### `outDir?: string`
输出目录，默认为 `'dist'`

```typescript
cssInjectPlugin({
  outDir: 'build' // 自定义输出目录
})
```

### `manifestName?: string`
manifest.json 文件名，默认为 `'manifest.json'`

```typescript
cssInjectPlugin({
  manifestName: 'extension-manifest.json' // 自定义 manifest 文件名
})
```

## 工作原理

1. **检测阶段**：在构建过程中检测所有生成的 CSS 文件
2. **匹配阶段**：根据配置的规则匹配目标 content_scripts
3. **注入阶段**：将 CSS 文件路径添加到 manifest.json 的 `css` 数组中
4. **更新阶段**：重新生成 manifest.json 文件

## 使用示例

### Chrome Extension 项目

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig(({ mode }) => {
  const isDev = mode === 'development'
  
  return {
    plugins: [
      cssInjectPlugin({
        debug: isDev, // 开发环境启用调试
        cssPattern: /\.css$/,
        targetScripts: ['content-scripts']
      })
    ]
  }
})
```

### 多环境配置

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig(({ mode }) => {
  return {
    plugins: [
      cssInjectPlugin({
        debug: mode === 'development',
        cssPattern: /\.(css|scss|less)$/,
        targetScripts: ['content-scripts', 'popup', 'options'],
        outDir: mode === 'production' ? 'dist' : 'dev-dist'
      })
    ]
  }
})
```

## 注意事项

1. **插件顺序**：建议将此插件放在其他插件之后，使用 `enforce: 'post'`
2. **CSS 导入**：确保在内容脚本的入口文件中正确导入 CSS 文件
3. **文件路径**：插件会自动处理相对路径，无需手动配置
4. **构建时机**：插件在 `closeBundle` 钩子中执行，确保在所有文件生成后运行

## 故障排除

### CSS 文件未被注入

1. 检查 CSS 文件是否正确导入到内容脚本中
2. 确认 `cssPattern` 配置是否正确
3. 启用 `debug` 选项查看详细日志

### 样式仍然丢失

1. 确认 manifest.json 中 `css` 数组不为空
2. 检查 CSS 文件是否正确生成
3. 验证扩展是否正确加载了 CSS 文件

### 插件未执行

1. 检查插件是否正确导入和配置
2. 确认 `outDir` 和 `manifestName` 配置是否正确
3. 查看构建日志是否有错误信息

## 开发

### 本地开发

```bash
# 克隆仓库
git clone https://github.com/your-username/vite-plugin-css-inject-manifest.git
cd vite-plugin-css-inject-manifest

# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

### 测试

```bash
# 运行测试
npm test

# 构建并测试
npm run build && npm test
```

## 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 打开 Pull Request

## 许可证

MIT License - 查看 [LICENSE](LICENSE) 文件了解详情。

## 更新日志

### v1.0.0
- 初始版本
- 支持基础 CSS 注入功能
- 添加配置选项和调试功能
- 支持多种构建格式
- 完整的 TypeScript 类型支持

## 相关链接

- [Vite 官方文档](https://vitejs.dev/)
- [Chrome Extension 开发指南](https://developer.chrome.com/docs/extensions/)
- [Manifest V3 文档](https://developer.chrome.com/docs/extensions/mv3/) 