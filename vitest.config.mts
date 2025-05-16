/**
 * @用途
 * @author 黄敏
 * @创建时间 2025-05-16 15:46
 **/

import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(viteConfig, defineConfig({
	test: {
		globals: true,
		environment: 'happy-dom',
		include: ['src/**/*.{test,spec}.{js,ts,jsx,tsx}'],
		coverage: {
			provider: 'v8',
			reporter: ['text', 'json', 'html'],
			exclude: [
				'node_modules/**',
				'dist/**',
				'**/*.d.ts',
			]
		},
		deps: {
			optimizer: {
				web: {
					include: ['vuetify']
				}
			}
		}
	},
}))