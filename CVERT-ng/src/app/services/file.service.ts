import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'

import { ImageInstance } from '../classes/imageInstance';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  private ipc: IpcRenderer;

  constructor() {
    if ((<any>window).require) {
      try {
        this.ipc = (<any>window).require('electron').ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn('Could not load electron ipc');
    }
  }

  async saveImage(image: ImageInstance) {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.send("saveFile", image.uri, image.jimpObject._originalMime);
      resolve();
    });
  }

  async saveImageToPath(image: ImageInstance, path: string) {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.send("saveFileToPath", image.uri, image.jimpObject._originalMime, path);
      resolve();
    });
  }

  async getOutputDirectory() {
    return new Promise<string>((resolve, reject) => {
      this.ipc.once('getOutputDirectoryResponse', (event, path) => {
        resolve(path);
      });
      this.ipc.send('getOutputDirectory');
    })
  }

  async getIntputFiles() {
    return new Promise<string[]>((resolve, reject) => {
      this.ipc.once('getInputFilesResponse', (event, path) => {
        resolve(path);
      });
      this.ipc.send('getInputFiles');
    })
  }

  openParameters() {
    this.ipc.send('openAlgorithmParametersWindow');
  }

  saveAlgorithmParameters(algorithmParameters: any) {
    this.ipc.send('saveAlgorithmParameters', algorithmParameters);
  }

}
