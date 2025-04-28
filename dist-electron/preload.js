"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("electronAPI", {
  setTheme: (theme) => electron.ipcRenderer.send("set-theme", theme),
  getTheme: () => electron.ipcRenderer.invoke("get-theme")
});
