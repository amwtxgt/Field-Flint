import {defineConfig} from 'vite'
import fs from 'node:fs'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electronPlugin from 'vite-plugin-electron'
import {resolve} from 'path'
import {ChildProcessWithoutNullStreams, spawn} from 'child_process'
import electronPath from 'electron'

fs.rmSync('dist', {recursive: true, force: true})
//@ts-ignore
console.log('111111111黄敏',process.electronApp)
let electronApp: ChildProcessWithoutNullStreams | undefined

//重新加载应用
function reloadElectronApp() {
	if (electronApp) {
		electronApp.removeAllListeners()
		electronApp.kill()
	}

	// Start Electron.app
	electronApp = spawn(electronPath as unknown as string, ['.', '--no-sandbox'])
	// Exit command after Electron.app exits
	electronApp.once('exit', process.exit)

	electronApp.stdout?.on('data', (data) => {
		const str = data.toString().trim()
		str && console.log(str)
	})
	electronApp.stderr?.on('data', (data) => {
		const str = data.toString().trim()
		str && console.error(str)
	})
}


export default defineConfig({

	root: './src', // 将根目录更改为src
	plugins: [
		vue(),
		vuetify(),
		electronPlugin([
			{
				entry: 'electron/main.ts',
				onstart() {
					reloadElectronApp()
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
					reloadElectronApp()
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
			'@': resolve(__dirname, 'src'),
		},
	},

})