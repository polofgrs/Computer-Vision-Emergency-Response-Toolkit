import { Observable, Observer } from 'rxjs';

import Jimp from 'jimp';
import { Filter } from './filter';

export class ImageInstance {

  jimpObject: any;
  uri: string;
  histogram: number[][];

  constructor(uri) {
    this.update(uri);
  }

  update(uri) {
    // console.log(uri.toString());
    Jimp.read(uri).then(image => {
      var resizedImage = image.resize(800, Jimp.AUTO);
      this.jimpObject = resizedImage;
      this.setBase64Data(resizedImage);
      // this.histogram = [[],[],[]];
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

  applyFilterList(filtersList: Array<Filter>) {
    var jimpFilterArray = [];
    for (let filter of filtersList) {
      var name = filter.filter.name;
      var args = [];
      for (let arg of filter.filter.args) {
        args.push(arg.value);
      }
      jimpFilterArray.push({apply: name, params: args});
    }
    // console.log(jimpFilterArray);
    var result =  this.jimpObject.clone().color(jimpFilterArray);
    return result;
    // return new ImageInstance(this.jimpObject.color(jimpFilterArray));
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
     // console.log(uri);
     if (typeof uri == "string") { // TODO: fix error here : uri is either string or jimpInstance
       img.src = uri; // if jimpinstance, uri.uri returns undefined.
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
