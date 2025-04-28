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
  if (process.env.VITE_DEV_SERVER_URL) {
    await mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL + "/src/pages/index/index.html");
    await window2.loadURL(process.env.VITE_DEV_SERVER_URL + "/src/pages/Window2/index.html");
    mainWindow.webContents.openDevTools();
  } else {
    await mainWindow.loadFile(path.join(__dirname, "../dist/pages/index/index.html"));
    await window2.loadFile(path.join(__dirname, "../dist/pages/Window2/index.html"));
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
