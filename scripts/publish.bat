@echo off
echo 开始发布 vite-plugin-css-inject-manifest...

REM 检查是否登录 npm
npm whoami
if errorlevel 1 (
    echo 请先登录 npm: npm login
    pause
    exit /b 1
)

REM 构建项目
echo 构建项目...
npm run build

REM 检查构建是否成功
if not exist "dist" (
    echo 构建失败，dist 目录不存在
    pause
    exit /b 1
)

REM 运行测试（如果有的话）
REM npm test

REM 发布到 npm
echo 发布到 npm...
npm publish

echo 发布完成！
pause 