"use strict";const e=require("electron");e.contextBridge.exposeInMainWorld("electronAPI",{setTheme:t=>e.ipcRenderer.send("set-theme",t),getTheme:()=>e.ipcRenderer.invoke("get-theme")});
