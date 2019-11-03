import { app, BrowserWindow, dialog, ipcMain} from 'electron';
import * as path from 'path';
import * as url from 'url';
import * as fs from 'fs';

import * as exifr from 'exifr';
var parser = require('fast-xml-parser');

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

//parameters window
ipcMain.on('openAlgorithmParametersWindow', (event) => {

  const win = new BrowserWindow({
    width: 900,
    height: 600,
    center: true,
    resizable: true,
    frame: true,
    transparent: false,
    webPreferences: {
      nodeIntegration: true // for nodeJS integration
    }
  });

  var urlToNav = url.format({
        pathname: path.join(__dirname, `/../../dist/CVERT-ng/index.html`),
        protocol: 'file:',
        slashes: true,
      })
  urlToNav = urlToNav + '#/parameters';
  console.log(urlToNav);
  win.loadURL(urlToNav);
})

//save algorithm parameters to assets.json
ipcMain.on('saveAlgorithmParameters', (event, algorithmParameters) => {
  // console.log(algorithmParameters);
  var assetsPath = url.format({
    pathname: path.join(__dirname, `/../../dist/CVERT-ng/assets/assets.json`),
    slashes: true,
  })
  var assets = JSON.parse(fs.readFileSync(assetsPath).toString());
  // console.log(assets);
  assets.algorithmParameters = algorithmParameters;
  fs.writeFile(assetsPath, JSON.stringify(assets), (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log('Saved Algorithm Parameters');
    }
  });
})

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

//GIS data get
ipcMain.on('getGISdata', (event, path: string) => {
  if (fs.lstatSync(path).isFile()) {
    fs.readFile(path, (err, data) => {
      exifr.parse(data, {'xmp': true}).then(exif => {
        var xmpData = getXMPfromExif(exif.xmp);
        win.webContents.send('getGISdataResponse', xmpData);
      })
    })
  }
})

//check if path exists
ipcMain.on('pathExists', (event, path: string) => {
  win.webContents.send('pathExistsResponse', fs.lstatSync(path).isFile());
})

// XMP getter from file Exif
function getXMPfromExif(exif: string) {
  var gisData = {};
  var dom = parser.parse(exif, {ignoreAttributes: false});
  var dji_xmp = dom['x:xmpmeta']['rdf:RDF']['rdf:Description'];
  if (dji_xmp['@_rdf:about'] == "DJI Meta Data") {
    console.log("found DJI Meta Data");
    for (const [xmpKey, xmpValue] of Object.entries(dji_xmp)) {
      if (xmpKey.includes("@_drone-dji:")) {
        var key = xmpKey;
        key = key.replace("@_drone-dji:","");
        var numberValue = Number(xmpValue);
        if (!isNaN(numberValue)) {
          gisData[key] = numberValue;
        } else {
          gisData[key] = xmpValue;
        }
      }
    }
  }
  return gisData;
}
