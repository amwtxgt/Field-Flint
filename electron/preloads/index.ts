import { contextBridge, ipcRenderer } from 'electron'
console.log('preload OK')
contextBridge.exposeInMainWorld('electronAPI', {
  setTheme: (theme: string) => ipcRenderer.send('set-theme', theme),
  getTheme: () => ipcRenderer.invoke('get-theme'),
}) 