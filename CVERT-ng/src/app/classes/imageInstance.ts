import { Observable, Observer } from 'rxjs';
import * as assets from '../../assets/assets.json';
import { ServerService } from '../services/server.service';

import Jimp from 'jimp';
import { Filter } from './filter';
import { GisData } from './gisData';

export class ImageInstance {

  jimpObject: any;
  uri: string;
  histogram: number[][];
  gisData: GisData;

  constructor(uri) {
    this.update(uri);
  }

  update(uri) {
    // console.log(uri.toString());
    Jimp.read(uri).then(image => {
      var resizedImage = image.resize(800, Jimp.AUTO);
      this.jimpObject = resizedImage;
      this.setBase64Data(resizedImage);
      if (typeof uri == 'string') {
        const ipc = (<any>window).require('electron').ipcRenderer;
        ipc.once("pathExistsResponse", (event, pathExists) => {
          if (pathExists) {
            this.gisData = new GisData(uri);
          }
        });
        ipc.send("pathExists", uri);
      }
    });
  }

  setBase64Data(image: Jimp) {
    var self = this;
    image.getBase64(image.getMIME(), function(err, base64data) {
      self.uri = base64data;
      self.getHistogram(base64data).subscribe(data => {
        self.histogram = data;
      });
    });
  }

  applyFilterList(filtersList: Array<Filter>, server: ServerService) : Promise<any> {
    var that = this;
    return new Promise(function(resolve, reject) {
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
            var result = result.color(jimpFilterArray);
            jimpFilterArray = [];
          }
          console.log('need to apply server filter');
          console.log(filter.filter.name);
          // TODO : wait for image from server
          // can be async
          // in case of error, reject(err)
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
