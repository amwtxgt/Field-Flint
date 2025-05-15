import {defineConfig} from 'vite'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electronPlugin from 'vite-plugin-electron'
import {resolve} from 'path'
import {ChildProcessWithoutNullStreams, spawn} from 'child_process'
import killF2 from './killf2'
import electron from 'electron'

let electronApp: ChildProcessWithoutNullStreams | undefined

fs.rmSync('dist-electron', {recursive: true, force: true})

export default defineConfig({
	plugins: [
		vue(),
		vuetify(),
		electronPlugin([
			{
				entry: 'electron/main.ts',
				onstart({startup}) {
					if (electronApp) {
						electronApp.removeAllListeners()
						electronApp.kill()
					}

					killF2('electron.exe', () => {
						// Start Electron.app
						electronApp = spawn(electron as unknown as string, ['.', '--no-sandbox'])
						// Exit command after Electron.app exits
						electronApp.once('exit', process.exit)

						electronApp.stdout?.on('data', data => {
							const str = data.toString().trim()
							str && console.log(str)
						})
						electronApp.stderr?.on('data', data => {
							const str = data.toString().trim()
							str && console.error(str)
						})
					})
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
			'/': resolve(__dirname),
		},
	},
}) 