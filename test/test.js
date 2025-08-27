// 简单的测试文件
const { cssInjectPlugin } = require('../dist/index.js')

console.log('插件加载成功:', cssInjectPlugin)

// 测试插件配置
const plugin = cssInjectPlugin({
  debug: true,
  cssPattern: /\.css$/,
  targetScripts: ['content-scripts']
})

console.log('插件配置成功:', plugin.name)
console.log('插件钩子:', Object.keys(plugin)) 