import {defineConfig} from 'vite'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electron from 'vite-plugin-electron'
import {resolve} from 'path'
import {ChildProcessWithoutNullStreams, spawn} from 'child_process'
import killF2 from './killf2'
import electronPath from 'electron'

let electronApp: ChildProcessWithoutNullStreams | undefined

fs.rmSync('dist-electron', {recursive: true, force: true})

export default defineConfig({
	plugins: [
		vue(),
		vuetify(),
		electron([
			{
				entry: 'electron/main.ts',
				onstart({reload}) {
					reload()
				},
				vite: {
					build: {
						rollupOptions: {
							output: {
								dir: 'z-dist'
							}
						}
					},
				},
			},
			{
				entry: 'electron/preloads/index.ts',
				onstart(options) {
					options.reload()
				},
				vite: {
					build: {
						rollupOptions: {
							output: {
								dir: 'z-dist/preloads'
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
				main: resolve(__dirname, 'pages/index/index.html'),
				window2: resolve(__dirname, 'pages/Window2/index.html'),
			},
			output: {
				dir: 'z-dist'
			}
		},
	},
	resolve: {
		alias: {
			'assets': resolve(__dirname, 'assets'),
			'pages': resolve(__dirname, 'pages'),
			'~': resolve(__dirname),
		},
	},
}) 