import { BuildEnvironmentOptions, defineConfig } from 'vite';
import fs from 'node:fs';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import electronPlugin from 'vite-plugin-electron';
import { resolve } from 'path';

import reloadElectronApp from './reloadElectronApp';

fs.rmSync('dist', { recursive: true, force: true });

// 共享的构建配置
const sharedBuildConfig = (dir: string, format: 'esm' | 'cjs') => {
   return {
      rollupOptions: {
         output: {
            format: format,
            dir: dir,
         },
      },
   } as BuildEnvironmentOptions;
};

export default defineConfig({
   plugins: [
      vue(),
      vuetify(),
      electronPlugin([
         {
            entry: 'src/electron/main.ts',
            onstart() {
               reloadElectronApp();
            },
            vite: {
               build: sharedBuildConfig('dist', 'esm'),
            },
         },
         {
            entry: 'src/preloads/index.ts',
            onstart() {
               reloadElectronApp();
            },
            vite: {
               build: sharedBuildConfig('dist/preloads', 'cjs'),
            },
         },
      ]),
   ],
   build: {
      emptyOutDir: true,
      rollupOptions: {
         input: {
            main: resolve(__dirname, 'src/renderer/pages/index/index.html'),
            calendar: resolve(__dirname, 'src/renderer/pages/calendar/index.html'),
         },
         output: sharedBuildConfig('dist', 'esm').rollupOptions.output,
      },
   },
   resolve: {
      alias: {
         '@': resolve(__dirname, 'src'),
         '@components': resolve(__dirname, 'src/renderer/components'),
         '@assets': resolve(__dirname, 'src/renderer/assets'),
         '@pages': resolve(__dirname, 'src/renderer/pages'),
         '@electron': resolve(__dirname, 'src/electron'),
         '@preloads': resolve(__dirname, 'src/preloads'),
      },
   },
});
