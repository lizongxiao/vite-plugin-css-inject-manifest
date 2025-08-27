import type { Plugin } from 'vite'

export interface CssInjectPluginOptions {
  /** 是否启用调试日志 */
  debug?: boolean
  /** 自定义 CSS 文件匹配规则 */
  cssPattern?: RegExp
  /** 是否只注入到特定的 content_scripts */
  targetScripts?: string[]
  /** 输出目录，默认为 'dist' */
  outDir?: string
  /** manifest.json 文件名，默认为 'manifest.json' */
  manifestName?: string
}

/**
 * CSS 注入插件
 * 用于将 CSS 文件自动注入到 Chrome Extension 的 manifest.json 中
 * 
 * @param options 插件配置选项
 * @returns Vite 插件
 * 
 * @example
 * ```typescript
 * import { cssInjectPlugin } from 'vite-plugin-css-inject-manifest'
 * 
 * export default defineConfig({
 *   plugins: [
 *     cssInjectPlugin({
 *       debug: true,
 *       cssPattern: /\.(css|scss|less)$/,
 *       targetScripts: ['content-scripts']
 *     })
 *   ]
 * })
 * ```
 */
export function cssInjectPlugin(options: CssInjectPluginOptions = {}): Plugin {
  const {
    debug = false,
    cssPattern = /\.css$/,
    targetScripts = [],
    outDir = 'dist',
    manifestName = 'manifest.json'
  } = options

  return {
    name: 'vite-plugin-css-inject-manifest',
    enforce: 'post',
    closeBundle() {
      const fs = require('fs')
      const path = require('path')
      
      const manifestPath = path.join(outDir, manifestName)
      
      try {
        // 检查 manifest.json 是否存在
        if (!fs.existsSync(manifestPath)) {
          if (debug) {
            console.log(`[vite-plugin-css-inject-manifest] manifest.json 不存在: ${manifestPath}`)
          }
          return
        }

        // 读取 manifest.json
        const manifestContent = fs.readFileSync(manifestPath, 'utf-8')
        const manifest = JSON.parse(manifestContent)
        
        // 查找 CSS 文件
        const cssFiles: string[] = []
        const cssDir = path.join(outDir, 'css')
        
        if (fs.existsSync(cssDir)) {
          const files = fs.readdirSync(cssDir)
          files.forEach((file: string) => {
            if (cssPattern.test(file)) {
              cssFiles.push(`css/${file}`)
            }
          })
        }

        if (debug) {
          console.log(`[vite-plugin-css-inject-manifest] 找到 ${cssFiles.length} 个 CSS 文件:`, cssFiles)
        }

        // 将 CSS 文件注入到 content_scripts 中
        if (manifest.content_scripts && cssFiles.length > 0) {
          let injectedCount = 0

          manifest.content_scripts.forEach((script: any, index: number) => {
            // 检查是否为目标脚本
            if (targetScripts.length > 0) {
              const scriptName = script.js?.[0] || `script-${index}`
              const isTarget = targetScripts.some(target => 
                scriptName.includes(target)
              )
              if (!isTarget) {
                return
              }
            }

            if (script.js && script.js.length > 0) {
              // 确保 css 数组存在
              if (!script.css) {
                script.css = []
              }
              
              // 添加 CSS 文件
              cssFiles.forEach((cssFile) => {
                if (!script.css.includes(cssFile)) {
                  script.css.push(cssFile)
                  injectedCount++
                }
              })
            }
          })

          // 写回 manifest.json
          fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
          
          if (debug) {
            console.log(`[vite-plugin-css-inject-manifest] 成功注入 ${injectedCount} 个 CSS 文件到 manifest.json`)
          } else {
            console.log('CSS 已注入到 manifest.json')
          }
        } else {
          if (debug) {
            console.log('[vite-plugin-css-inject-manifest] 未找到 content_scripts 或 CSS 文件')
          }
        }
      } catch (error) {
        console.error('[vite-plugin-css-inject-manifest] 处理 manifest.json 时发生错误:', error)
      }
    }
  }
}

// 默认导出
export default cssInjectPlugin 