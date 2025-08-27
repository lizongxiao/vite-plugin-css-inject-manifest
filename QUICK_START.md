# 快速开始指南

## 发布到 npm

### 1. 准备工作

确保您已经：
- 注册了 npm 账号
- 登录了 npm (`npm login`)
- 检查包名是否可用

### 2. 发布步骤

```bash
# 进入插件目录
cd vite-plugin-css-inject-manifest

# 安装依赖
npm install

# 构建项目
npm run build

# 检查构建结果
ls dist/

# 发布到 npm
npm publish
```

### 3. 验证发布

```bash
# 检查包是否已发布
npm view vite-plugin-css-inject-manifest

# 测试安装
npm install vite-plugin-css-inject-manifest
```

## 使用示例

### 安装插件

```bash
npm install vite-plugin-css-inject-manifest
```

### 在项目中使用

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'

export default defineConfig({
  plugins: [
    cssInjectPlugin({
      debug: true,
      cssPattern: /\.css$/,
      targetScripts: ['content-scripts']
    })
  ]
})
```

## 目录结构

```
vite-plugin-css-inject-manifest/
├── src/
│   └── index.ts              # 插件源码
├── dist/                     # 构建输出
│   ├── index.js             # CommonJS 格式
│   ├── index.mjs            # ES Module 格式
│   └── index.d.ts           # TypeScript 类型定义
├── example/                  # 使用示例
├── scripts/                  # 发布脚本
├── test/                     # 测试文件
├── package.json             # 包配置
├── tsconfig.json            # TypeScript 配置
├── tsup.config.ts           # 构建配置
├── README.md                # 详细文档
├── LICENSE                  # 许可证
├── PUBLISH.md               # 发布指南
└── QUICK_START.md           # 快速开始
```

## 开发命令

```bash
# 开发模式（监听文件变化）
npm run dev

# 构建项目
npm run build

# 发布前构建
npm run prepublishOnly
```

## 注意事项

1. **包名唯一性**：确保 `vite-plugin-css-inject-manifest` 在 npm 上是唯一的
2. **版本管理**：使用 `npm version` 命令管理版本号
3. **测试构建**：发布前确保构建成功且测试通过
4. **文档更新**：确保 README.md 是最新的

## 常见问题

### 包名已存在
如果包名被占用，可以：
- 使用不同的包名（如 `@your-username/vite-plugin-css-inject-manifest`）
- 联系包的所有者
- 选择其他名称

### 构建失败
检查：
- TypeScript 配置是否正确
- 依赖是否安装完整
- 源码是否有语法错误

### 发布失败
检查：
- 是否已登录 npm
- 包名是否合法
- 版本号是否正确
- 构建是否成功 