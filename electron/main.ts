import { app, BrowserWindow, ipcMain, session } from 'electron'
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
      preload: join(__dirname, './preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  const window2 = new BrowserWindow({
    show: true,
    webPreferences: {
      preload: join(__dirname, './preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  // 设置 CSP 头部
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: http:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          "style-src 'self' 'unsafe-inline';",
          "img-src 'self' data: https: http:;",
          "font-src 'self' data: https: http:;",
          "connect-src 'self' https: http:;"
        ]
      }
    })
  })

  window2.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        'Content-Security-Policy': [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: http:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          "style-src 'self' 'unsafe-inline';",
          "img-src 'self' data: https: http:;",
          "font-src 'self' data: https: http:;",
          "connect-src 'self' https: http:;"
        ]
      }
    })
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
    await window2.loadURL(process.env.VITE_DEV_SERVER_URL + '/window2.html')
    mainWindow.webContents.openDevTools()
  } else {
    await mainWindow.loadFile(join(__dirname, '../dist/index.html'))
    await window2.loadFile(join(__dirname, '../dist/window2.html'))
  }

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  window2.on('ready-to-show', () => {
    window2.show()
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