import { app, BrowserWindow } from 'electron'
import { join } from 'path'
import { URL } from 'url'

async function createWindow() {
  const mainWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  })

  const window2 = new BrowserWindow({
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
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