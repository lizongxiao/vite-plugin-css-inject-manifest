const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('开始测试构建...');

// 清理之前的构建
if (fs.existsSync('example/dist')) {
  fs.rmSync('example/dist', { recursive: true, force: true });
}

// 复制manifest.json到输出目录
if (!fs.existsSync('example/dist')) {
  fs.mkdirSync('example/dist', { recursive: true });
}
fs.copyFileSync('example/manifest.json', 'example/dist/manifest.json');

// 运行构建
try {
  execSync('cd example && npm run build', { stdio: 'inherit' });
  console.log('构建完成');
  
  // 检查结果
  if (fs.existsSync('example/dist/manifest.json')) {
    const manifest = JSON.parse(fs.readFileSync('example/dist/manifest.json', 'utf-8'));
    console.log('最终的manifest.json:');
    console.log(JSON.stringify(manifest, null, 2));
  }
} catch (error) {
  console.error('构建失败:', error.message);
} 