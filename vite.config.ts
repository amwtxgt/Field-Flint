import { defineConfig } from 'vite'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electronPlugin from 'vite-plugin-electron'
import {resolve} from 'path'

fs.rmSync('dist', {recursive: true, force: true})


export default defineConfig({

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

})