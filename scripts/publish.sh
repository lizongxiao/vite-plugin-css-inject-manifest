#!/bin/bash

# 发布脚本
echo "开始发布 vite-plugin-css-inject-manifest..."

# 检查是否登录 npm
if ! npm whoami; then
    echo "请先登录 npm: npm login"
    exit 1
fi

# 构建项目
echo "构建项目..."
npm run build

# 检查构建是否成功
if [ ! -d "dist" ]; then
    echo "构建失败，dist 目录不存在"
    exit 1
fi

# 运行测试（如果有的话）
# npm test

# 发布到 npm
echo "发布到 npm..."
npm publish

echo "发布完成！" 