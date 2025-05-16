import { defineProject } from 'vitest/config'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electronPlugin from 'vite-plugin-electron'
import {resolve} from 'path'

fs.rmSync('dist', {recursive: true, force: true})


export default defineProject({

	root: './src', // 将根目录更改为src
	plugins: [
		vue(),
		vuetify(),
		electronPlugin([
			{
				entry: 'electron/main.ts',
				onstart({startup}) {
					startup().then(async () => {

					})
				},
				vite: {
					build: {
						rollupOptions: {
							output: {
								dir: 'dist'
							}
						}
					},
				},
			},
			{
				entry: 'preloads/index.ts',
				onstart(options) {
					options.reload()
				},
				vite: {
					build: {
						rollupOptions: {
							output: {
								dir: 'dist/preloads'
							}
						}
					},
				},
			},
		]),
	],
	build: {
		rollupOptions: {
			input: {
				main: resolve(__dirname, 'src/renderer/pages/index/index.html'),
				// window2: resolve(__dirname, 'pages/Window2/index.html'),
			},
			output: {
				dir: 'dist'
			}
		},
	},
	resolve: {
		alias: {
			'@': resolve(__dirname,'src'),
		},
	},
	/* Vitest 配置 */
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
			inline: ['vuetify']
		}
	},
})