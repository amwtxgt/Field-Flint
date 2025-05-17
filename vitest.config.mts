/**
 * Vitest 配置文件
 * @description 用于配置单元测试环境、覆盖率报告等测试相关功能
 * @author 黄敏
 * @date 2024-05-16
 * @lastModified 2024-05-16
 * @features
 * - 使用 happy-dom 作为测试环境
 * - 支持代码覆盖率报告（text/json/html）
 * - 集成 Vuetify 依赖优化
 */

import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
	// 合并 Vite 的基础配置
	viteConfig, 
	defineConfig({
		test: {
			// 启用全局测试 API，无需手动导入 describe, it, expect 等
			globals: true,
			
			// 使用 happy-dom 作为测试环境，模拟浏览器 DOM 环境
			environment: 'happy-dom',
			
			// 指定测试文件的匹配模式
			include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
			
			// 代码覆盖率配置
			coverage: {
				// 使用 V8 内置的覆盖率收集器
				provider: 'v8',
				// 输出多种格式的覆盖率报告
				reporter: ['text', 'json', 'html'],
				// 排除不需要统计覆盖率的文件
				exclude: [
					'node_modules/**',  // 排除第三方依赖
					'dist/**',          // 排除构建产物
					'**/*.d.ts',        // 排除类型声明文件
				]
			},
			
			// 依赖项优化配置
			deps: {
				optimizer: {
					web: {
						// 将 Vuetify 包含在优化范围内，提升测试性能
						include: ['vuetify']
					}
				}
			}
		},
	})
)