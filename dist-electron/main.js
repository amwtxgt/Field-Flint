"use strict";
const electron = require("electron");
const path = require("path");
async function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });
  const window2 = new electron.BrowserWindow({
    show: false,
    webPreferences: {
      preload: path.join(__dirname, "../preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
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
