import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'
import {ChildProcessWithoutNullStreams, spawn} from 'child_process'
import killF2 from './killf2'
import electronPath from 'electron'

let electronApp: ChildProcessWithoutNullStreams | undefined


export default defineConfig({
  plugins: [
    vue(),
    vuetify(),
    electron([
      {
        entry: 'electron/main.ts',
        onstart() {
          if (electronApp) {
            electronApp.removeAllListeners()
            electronApp.kill()
          }

          killF2('electron.exe', () => {
            // Start Electron.app
            electronApp = spawn(electronPath as unknown as string, ['.', '--no-sandbox'])
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
      },
      {
        entry: 'electron/preload.ts',
        onstart(options) {
          options.reload()
        },
      },
    ]),
    renderer(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        window2: resolve(__dirname, 'window2.html'),
      },
    },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
}) 