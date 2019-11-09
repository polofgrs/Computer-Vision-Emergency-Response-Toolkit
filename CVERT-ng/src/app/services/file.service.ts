import { Injectable } from '@angular/core'
import { IpcRenderer } from 'electron'

import { ImageInstance } from '../classes/imageInstance';
import * as THREE from 'three';

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
    });
  }

  openParameters() {
    this.ipc.send('openAlgorithmParametersWindow');
  }

  saveAlgorithmParameters(algorithmParameters: any) {
    this.ipc.send('saveAlgorithmParameters', algorithmParameters);
  }

}
