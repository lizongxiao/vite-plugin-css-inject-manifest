const { execSync } = require('child_process');
const fs = require('fs');

console.log('⚡ 快速功能测试...\n');

// 清理并运行构建
console.log('🔨 运行构建测试...');
try {
  // 清理之前的构建
  if (fs.existsSync('example/dist')) {
    fs.rmSync('example/dist', { recursive: true, force: true });
  }
  
  // 运行构建
  execSync('cd example && npm run build', { stdio: 'inherit' });
  console.log('✅ 构建成功\n');
  
  // 检查生成的manifest.json
  const manifestPath = 'example/dist/manifest.json';
  if (fs.existsSync(manifestPath)) {
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
    
    console.log('📄 生成的manifest.json:');
    console.log(JSON.stringify(manifest, null, 2));
    
    // 验证关键功能
    console.log('\n🔍 功能验证:');
    
    // 1. 检查基础字段
    const basicChecks = [
      { field: 'name', expected: '动态配置的扩展名称' },
      { field: 'version', expected: '1.0.1' },
      { field: 'description', expected: '这是一个通过构建时动态修改的扩展描述' }
    ];
    
    let allPassed = true;
    basicChecks.forEach(check => {
      if (manifest[check.field] === check.expected) {
        console.log(`✅ ${check.field}: ${manifest[check.field]}`);
      } else {
        console.log(`❌ ${check.field}: 期望 ${check.expected}, 实际 ${manifest[check.field]}`);
        allPassed = false;
      }
    });
    
    // 2. 检查CSS注入
    if (manifest.content_scripts && manifest.content_scripts.length > 0) {
      const script = manifest.content_scripts[0];
      if (script.css && script.css.length > 0) {
        console.log(`✅ CSS注入成功: ${script.css.join(', ')}`);
      } else {
        console.log('❌ CSS注入失败: 没有找到CSS文件');
        allPassed = false;
      }
    } else {
      console.log('❌ content_scripts 不存在或为空');
      allPassed = false;
    }
    
    // 3. 检查文件结构
    const expectedFiles = [
      'example/dist/manifest.json',
      'example/dist/content-scripts.js',
      'example/dist/css/main.css'
    ];
    
    expectedFiles.forEach(file => {
      if (fs.existsSync(file)) {
        console.log(`✅ 文件存在: ${file}`);
      } else {
        console.log(`❌ 文件缺失: ${file}`);
        allPassed = false;
      }
    });
    
    if (allPassed) {
      console.log('\n🎉 所有功能测试通过！插件工作正常！');
      process.exit(0);
    } else {
      console.log('\n💥 部分功能测试失败！');
      process.exit(1);
    }
    
  } else {
    console.error('❌ manifest.json 文件不存在');
    process.exit(1);
  }
  
} catch (error) {
  console.error('❌ 测试失败:', error.message);
  process.exit(1);
} 