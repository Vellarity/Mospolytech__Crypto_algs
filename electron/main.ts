import { app, BrowserWindow, ipcMain, IpcMain } from "electron";
import * as url from 'url'
import * as path from 'path'

import * as A5_1 from './algs/a51'

app.on('ready', () =>{
  let win = new BrowserWindow({
    height: 900,
    width: 1600
  })

  const loadRes = async() =>{
    win.loadURL('http://localhost:3000/').catch(err =>{console.log(err); setTimeout(() => loadRes(), 10000)})
  }

  loadRes()

  win.webContents.openDevTools()

  win.on('closed', () =>{
    win.close()
  })
})

app.on('window-all-closed', () =>{
  if (process.platform !== 'darwin'){
    app.quit()
  }
})



ipcMain.handle('A5_1SH', (event, text, key) =>{
  return A5_1.enc(text, A5_1.setKey(key))
})

ipcMain.handle('A5_1DE', (event, text, key) =>{
  return A5_1.dec(text, A5_1.setKey(key))
})