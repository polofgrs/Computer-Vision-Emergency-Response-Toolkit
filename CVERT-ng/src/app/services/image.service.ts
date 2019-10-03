import { Injectable, OnInit } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImageService implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  getHistogram(uri: string) : Observable<number[][]> {
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
          avals[imagePixels[i+3]]++
        }
        observer.next([rvals, gvals, bvals, avals]);
      });
    });
  }

  getImagePixelsFromURI(uri: string) : Observable<Uint8ClampedArray> {
    return Observable.create((observer: Observer<Uint8ClampedArray>) => {
     let img = new Image();
     img.crossOrigin = 'Anonymous';
     img.src = uri;
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
