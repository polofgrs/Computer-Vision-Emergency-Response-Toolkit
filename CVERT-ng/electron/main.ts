import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

let win: BrowserWindow;

app.on('ready', createWindow);

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});

// IPC processes
ipcMain.on('getFiles', (event, arg) => {
  const files = fs.readdirSync(__dirname)
  win.webContents.send('getFilesResponse', files)
});

// mains process
function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });
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
