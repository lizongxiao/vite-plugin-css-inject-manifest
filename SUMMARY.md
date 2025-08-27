# 项目总结

## 项目概述

`vite-plugin-css-inject-manifest` 是一个专门为 Chrome Extension 开发的 Vite 插件，用于解决 CSS 样式在构建后丢失的问题。

## 核心功能

- ✅ **自动 CSS 注入**：将 CSS 文件自动注入到 manifest.json 的 content_scripts 中
- ✅ **灵活配置**：支持自定义 CSS 文件匹配规则和目标脚本
- ✅ **调试支持**：提供详细的调试日志功能
- ✅ **类型安全**：完整的 TypeScript 类型支持
- ✅ **多格式支持**：同时支持 CommonJS 和 ES Module 格式

## 技术栈

- **TypeScript**：提供类型安全和更好的开发体验
- **tsup**：快速构建工具，支持多种输出格式
- **Vite**：作为 peer dependency，支持 Vite 4.x 和 5.x

## 项目结构

```
vite-plugin-css-inject-manifest/
├── src/
│   └── index.ts              # 插件核心代码
├── dist/                     # 构建输出
│   ├── index.js             # CommonJS 格式
│   ├── index.mjs            # ES Module 格式
│   ├── index.d.ts           # TypeScript 类型定义
│   └── *.map               # Source maps
├── example/                  # 使用示例
├── scripts/                  # 发布脚本
│   ├── publish.sh           # Linux/Mac 发布脚本
│   └── publish.bat          # Windows 发布脚本
├── test/                     # 测试文件
│   └── test.js              # 简单测试
├── package.json             # 包配置
├── tsconfig.json            # TypeScript 配置
├── tsup.config.ts           # 构建配置
├── README.md                # 详细文档
├── LICENSE                  # MIT 许可证
├── PUBLISH.md               # 发布指南
├── QUICK_START.md           # 快速开始
└── SUMMARY.md               # 项目总结
```

## 构建输出

插件构建后生成以下文件：

- `index.js` - CommonJS 格式，适用于 Node.js 环境
- `index.mjs` - ES Module 格式，适用于现代浏览器和打包工具
- `index.d.ts` - TypeScript 类型定义文件
- `*.map` - Source maps，便于调试

## 配置选项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `debug` | `boolean` | `false` | 是否启用调试日志 |
| `cssPattern` | `RegExp` | `/\.css$/` | CSS 文件匹配规则 |
| `targetScripts` | `string[]` | `[]` | 目标脚本关键词 |
| `outDir` | `string` | `'dist'` | 输出目录 |
| `manifestName` | `string` | `'manifest.json'` | manifest 文件名 |

## 使用示例

### 基础用法

```typescript
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig({
  plugins: [cssInjectPlugin()]
})
```

### 高级配置

```typescript
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

## 发布信息

- **包名**：`vite-plugin-css-inject-manifest`
- **版本**：1.0.0
- **许可证**：MIT
- **Node.js 版本**：>= 16.0.0
- **Vite 版本**：^4.0.0 || ^5.0.0

## 开发命令

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建项目
npm run build

# 测试插件
node test/test.js

# 发布到 npm
npm publish
```

## 发布步骤

1. **准备工作**
   - 注册 npm 账号
   - 登录 npm (`npm login`)
   - 检查包名可用性

2. **构建和测试**
   - 运行 `npm run build`
   - 测试构建结果
   - 运行测试用例

3. **发布**
   - 使用 `npm publish` 发布
   - 或使用发布脚本

## 维护计划

- **版本管理**：使用语义化版本控制
- **文档更新**：保持 README.md 和示例代码的最新状态
- **问题跟踪**：通过 GitHub Issues 跟踪问题和功能请求
- **定期更新**：根据 Vite 版本更新进行适配

## 贡献指南

欢迎社区贡献：

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 创建 Pull Request

## 许可证

MIT License - 允许自由使用、修改和分发。

## 联系方式

- **GitHub**：https://github.com/your-username/vite-plugin-css-inject-manifest
- **Issues**：https://github.com/your-username/vite-plugin-css-inject-manifest/issues
- **npm**：https://www.npmjs.com/package/vite-plugin-css-inject-manifest 