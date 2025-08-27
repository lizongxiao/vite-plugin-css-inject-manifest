# 发布指南

## 准备工作

### 1. 注册 npm 账号
如果还没有 npm 账号，请先注册：
```bash
npm adduser
```

### 2. 登录 npm
```bash
npm login
```

### 3. 检查包名是否可用
```bash
npm search vite-plugin-css-inject-manifest
```

## 发布步骤

### 1. 更新版本号
```bash
# 补丁版本 (1.0.0 -> 1.0.1)
npm version patch

# 次要版本 (1.0.0 -> 1.1.0)
npm version minor

# 主要版本 (1.0.0 -> 2.0.0)
npm version major
```

### 2. 构建项目
```bash
npm run build
```

### 3. 测试构建结果
```bash
# 检查 dist 目录
ls dist/

# 应该包含以下文件：
# - index.js (CommonJS)
# - index.mjs (ES Module)
# - index.d.ts (TypeScript 类型定义)
```

### 4. 发布到 npm
```bash
npm publish
```

### 5. 验证发布
```bash
# 检查包是否已发布
npm view vite-plugin-css-inject-manifest

# 测试安装
npm install vite-plugin-css-inject-manifest
```

## 使用脚本发布

### Linux/Mac
```bash
chmod +x scripts/publish.sh
./scripts/publish.sh
```

### Windows
```cmd
scripts\publish.bat
```

## 注意事项

1. **包名唯一性**：确保包名在 npm 上是唯一的
2. **版本号**：每次发布都要更新版本号
3. **构建测试**：发布前确保构建成功
4. **文档更新**：确保 README.md 是最新的
5. **许可证**：确保 LICENSE 文件存在

## 常见问题

### 包名已存在
如果包名已被占用，可以：
- 使用不同的包名
- 联系包的所有者
- 使用 scoped package（如 @your-username/package-name）

### 发布失败
检查：
- 是否已登录 npm
- 包名是否合法
- 版本号是否正确
- 构建是否成功

### 权限问题
确保：
- 有发布权限
- 包名没有被其他用户占用
- 账号已验证

## 后续维护

### 更新包
1. 修改代码
2. 更新版本号
3. 构建项目
4. 发布新版本

### 废弃包
```bash
npm deprecate vite-plugin-css-inject-manifest "使用新版本"
```

### 删除包
```bash
npm unpublish vite-plugin-css-inject-manifest
```
注意：删除后 24 小时内不能重新发布同名包 