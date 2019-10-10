import { app, BrowserWindow, dialog, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

import Jimp from 'jimp';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// mains process
function createWindow() {
  win = new BrowserWindow({
    width: 1680,
    height: 760,
    webPreferences: {
      nodeIntegration: true // for nodeJS integration
    }
  });
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `/../../dist/CVERT-ng/index.html`),
      protocol: 'file:',
      slashes: true,
    })
  );
  // win.webContents.openDevTools();
  win.on('closed', () => {
    win = null;
  });
}

// IPC functions

//file get
ipcMain.on('saveFile', (event, base64Data: string, mime: string) => {
  var mimeList = mime.split("/");
  var filename = "output." + mimeList[1];
  var reg = '^data:' + mimeList[0] + '\\/' + mimeList[1] + ';base64,';
  var regex = new RegExp(reg);
  base64Data = base64Data.replace(regex, "");
  dialog.showSaveDialog({defaultPath: filename}).then((result) => {
    if (!result.canceled && result.filePath != undefined) {
      fs.writeFile(result.filePath, base64Data, 'base64', (err) => {
        if (err) throw err;
        console.log('file saved');
      });
    } else {
      console.log('file save canceled');
    }
  });
  // win.webContents.send('saveFileResponse', "saved !");
})
