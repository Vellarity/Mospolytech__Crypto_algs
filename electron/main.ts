import { app, BrowserWindow } from "electron";
import * as url from 'url'
import * as path from 'path'

app.on('ready', () =>{
  let win = new BrowserWindow({
    height: 900,
    width: 1600
  })

  win.loadURL(
    'http://localhost:3000/'
  )

  win.on('closed', () =>{
    win = null
  })
})

app.on('window-all-closed', () =>{
  if (process.platform !== 'darwin'){
    app.quit()
  }
})