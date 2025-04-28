"use strict";
const electron = require("electron");
const path = require("path");
let currentTheme = "light";
electron.ipcMain.handle("get-theme", () => currentTheme);
electron.ipcMain.on("set-theme", (_, theme) => {
  currentTheme = theme;
});
async function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  const window2 = new electron.BrowserWindow({
    show: true,
    webPreferences: {
      preload: path.join(__dirname, "./preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  mainWindow.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: http:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          "style-src 'self' 'unsafe-inline';",
          "img-src 'self' data: https: http:;",
          "font-src 'self' data: https: http:;",
          "connect-src 'self' https: http:;"
        ]
      }
    });
  });
  window2.webContents.session.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders,
        "Content-Security-Policy": [
          "default-src 'self' 'unsafe-inline' 'unsafe-eval' data: https: http:;",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval';",
          "style-src 'self' 'unsafe-inline';",
          "img-src 'self' data: https: http:;",
          "font-src 'self' data: https: http:;",
          "connect-src 'self' https: http:;"
        ]
      }
    });
  });
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL);
    await window2.loadURL(process.env.VITE_DEV_SERVER_URL + "/window2.html");
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
    await window2.loadFile(path.join(__dirname, "../dist/window2.html"));
  }
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  window2.on("ready-to-show", () => {
    window2.show();
  });
}
electron.app.whenReady().then(createWindow);
electron.app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
electron.app.on("activate", () => {
  if (electron.BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
