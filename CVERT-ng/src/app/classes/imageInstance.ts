import { Observable, Observer } from 'rxjs';
import * as assets from '../../assets/assets.json';

import { ServerService } from '../services/server.service';
import { GisService } from '../services/gis.service';

import Jimp from 'jimp';
import { Filter } from './filter';
import { GisData } from './gisData';

export class ImageInstance {

  jimpObject: any;
  uri: string;
  histogram: number[][];
  gisData: GisData;
  gisService: GisService;

  constructor() {
  }

  async update(uri, gisService: GisService) {
    // console.log(uri.toString());
    return new Promise((resolve, reject) => {
      Jimp.read(uri).then(image => {
        var resizedImage = image.resize(800, Jimp.AUTO);
        this.jimpObject = resizedImage;
        this.setBase64Data(resizedImage).then((data) => {
          if (typeof uri == 'string') {
            const ipc = (<any>window).require('electron').ipcRenderer;
            ipc.once("pathExistsResponse", (event, pathExists) => {
              if (pathExists) {
                this.gisService = gisService;
                this.gisData = new GisData(uri, gisService);
              }
              resolve();
            });
            ipc.send("pathExists", uri);
          } else {
            resolve();
          }
        });
      });
    });
  }

  async setBase64Data(image: Jimp) {
    var self = this;
    return new Promise((resolve, reject) => {
      image.getBase64(image.getMIME(), function(err, base64data) {
        self.uri = base64data;
        self.getHistogram(base64data).subscribe(data => {
          self.histogram = data;
          resolve();
        });
      });
    });
  }

  applyFilterList(filtersList: Array<Filter>, server: ServerService) : Promise<any> {
    var that = this;
    return new Promise(async function(resolve, reject) {
      var result = that.jimpObject.clone();
      var jimpFilterArray = [];
      for (let filter of filtersList) {
        if (that.isJimp(filter)) {
          var name = filter.filter.name;
          var args = [];
          for (let arg of filter.filter.args) {
            args.push(arg.value);
          }
          jimpFilterArray.push({apply: name, params: args});
        } else {
          if (jimpFilterArray.length > 0) {
            console.log('color');
            var result = result.color(jimpFilterArray);
            jimpFilterArray = [];
          }
          var data = await server.send(filter.filter, that.uri, 'response');
          result = await new Promise((resolve, reject) => {
            var buffer = Buffer.from(data.image, 'base64');
            Jimp.read(buffer)
            .then(image => {
              resolve(image);
            });
          })
        }
      }
      if (jimpFilterArray.length > 0) {
        var result = result.color(jimpFilterArray);
        jimpFilterArray = [];
      }
      resolve(result);
    });
  }

  isJimp(filter: Filter) {
    var found = assets.filters.find(function(element) {
      return(filter.filter.name == element.name);
    });
    return(typeof found !== 'undefined');
  }

  getHistogram(uri) : Observable<number[][]> {
    return Observable.create((observer: Observer<number[][]>) => {
      this.getImagePixelsFromURI(uri).subscribe(imagePixels => {
        var rvals = this.array256(0);
        var gvals = this.array256(0);
        var bvals = this.array256(0);
        var avals = this.array256(0);
        for (let i = 0; i < imagePixels.length; i += 4) {
          rvals[imagePixels[i]]++;
          gvals[imagePixels[i+1]]++;
          bvals[imagePixels[i+2]]++;
          avals[imagePixels[i+3]]++;
        }
        observer.next([rvals, gvals, bvals, avals]);
      });
    });
  }

  getImagePixelsFromURI(uri) : Observable<Uint8ClampedArray> {
    return Observable.create((observer: Observer<Uint8ClampedArray>) => {
     let img = new Image();
     img.crossOrigin = 'Anonymous';
     if (typeof uri == "string") {
       img.src = uri;
     } else {
       img.src = uri.uri;
     }
     if (!img.complete) {
       img.onload = () => {
         observer.next(this.getImagePixels(img));
         observer.complete();
       };
       img.onerror = (err) => {
         observer.error(err);
       };
     } else {
         observer.next(this.getImagePixels(img));
         observer.complete();
     }
   });
  }

  getImagePixels(img: HTMLImageElement): Uint8ClampedArray {
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
    return ctx.getImageData(0, 0, canvas.width, canvas.height).data;
  }

  array256(default_value: number) : number[] {
    var arr = [];
    for (var i=0; i<256; i++) { arr[i] = default_value; }
    return arr;
  }

}
