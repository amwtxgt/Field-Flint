import { app, BrowserWindow, ipcMain } from 'electron'
import { join } from 'path'

// 存储当前主题
let currentTheme = 'light'

// 注册主题相关的处理程序
ipcMain.handle('get-theme', () => currentTheme)
ipcMain.on('set-theme', (_, theme) => {
  currentTheme = theme
})



async function createWindow() {
  const mainWindow = new BrowserWindow({
    show: true,
    webPreferences: {
      preload: join(__dirname, './preloads/index.js'),
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL + 'renderer/pages/index/index.html')
  } else {
    await mainWindow.loadFile(join(__dirname, '../dist/renderer/pages/index/index.html'))
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

}

app.whenReady().then(createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
}) 