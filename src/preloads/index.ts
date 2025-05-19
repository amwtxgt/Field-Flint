const electron = require('electron');

console.log('preload OK');
electron.contextBridge.exposeInMainWorld('electronAPI', {
   setTheme: (theme: string) => electron.ipcRenderer.send('set-theme', theme),
   getTheme: () => electron.ipcRenderer.invoke('get-theme'),
});
