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
  /** manifest.json 源文件路径，默认为项目根目录的 manifest.json */
  manifestSource?: string
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
    manifestName = 'manifest.json',
    manifestSource = 'manifest.json'
  } = options

  return {
    name: 'vite-plugin-css-inject-manifest',
    enforce: 'post',
    async closeBundle() {
      const fs = await import('fs')
      const path = await import('path')
      
      const manifestPath = path.default.join(outDir, manifestName)
      
      try {
        // 如果目标manifest不存在，尝试从源文件复制
        if (!fs.default.existsSync(manifestPath)) {
          if (fs.default.existsSync(manifestSource)) {
            if (debug) {
              console.log(`[vite-plugin-css-inject-manifest] 复制 manifest.json 从 ${manifestSource} 到 ${manifestPath}`)
            }
            fs.default.copyFileSync(manifestSource, manifestPath)
          } else {
            if (debug) {
              console.log(`[vite-plugin-css-inject-manifest] manifest.json 不存在: ${manifestPath}`)
            }
            return
          }
        }

        // 读取 manifest.json
        const manifestContent = fs.default.readFileSync(manifestPath, 'utf-8')
        const manifest = JSON.parse(manifestContent)
        
        // 查找 CSS 文件
        const cssFiles: string[] = []
        
        // 递归查找所有CSS文件
        function findCssFiles(dir: string, baseDir: string = ''): void {
          if (!fs.default.existsSync(dir)) return
          
          const files = fs.default.readdirSync(dir)
          files.forEach((file: string) => {
            const filePath = path.default.join(dir, file)
            const relativePath = path.default.join(baseDir, file)
            const stat = fs.default.statSync(filePath)
            
            if (stat.isDirectory()) {
              findCssFiles(filePath, relativePath)
            } else if (cssPattern.test(file)) {
              cssFiles.push(relativePath.replace(/\\/g, '/'))
            }
          })
        }
        
        findCssFiles(outDir)

        if (debug) {
          console.log(`[vite-plugin-css-inject-manifest] 找到 ${cssFiles.length} 个 CSS 文件:`, cssFiles)
          console.log(`[vite-plugin-css-inject-manifest] 输出目录: ${outDir}`)
          console.log(`[vite-plugin-css-inject-manifest] manifest 路径: ${manifestPath}`)
        }

        // 将 CSS 文件注入到 content_scripts 中
        if (debug) {
          console.log(`[vite-plugin-css-inject-manifest] content_scripts 数量: ${manifest.content_scripts?.length || 0}`)
          console.log(`[vite-plugin-css-inject-manifest] CSS 文件数量: ${cssFiles.length}`)
        }
        
        if (manifest.content_scripts && cssFiles.length > 0) {
          let injectedCount = 0

          manifest.content_scripts.forEach((script: any, index: number) => {
            // 检查是否为目标脚本
            if (targetScripts.length > 0) {
              const scriptFiles = script.js || []
              const isTarget = scriptFiles.some((scriptFile: string) => 
                targetScripts.some(target => scriptFile.includes(target))
              )
              if (!isTarget) {
                if (debug) {
                  console.log(`[vite-plugin-css-inject-manifest] 跳过非目标脚本:`, scriptFiles)
                }
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
          fs.default.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
          
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