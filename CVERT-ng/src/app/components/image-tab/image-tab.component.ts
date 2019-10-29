import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';

@Component({
  selector: 'app-image-tab',
  templateUrl: './image-tab.component.html',
  styleUrls: ['./image-tab.component.scss']
})
export class ImageTabComponent implements OnInit {

  @Input() image: ImageInstance;
  @ViewChild("img") img: ElementRef;
  @ViewChild("overlayCanvas") overlayCanvas: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  onImageLoad() {
    this.refreshCanvas();
  }

  refreshCanvas() {
    this.resizeCanvas();
    // console.log(this.img.nativeElement.width);
    // console.log(this.overlayCanvas.nativeElement.height);
    // console.log(this.overlayCanvas.nativeElement.width);
    // TODO: change canvas size depending on img size
  }

  resizeCanvas() {
    this.overlayCanvas.nativeElement.height = this.img.nativeElement.height;
    this.overlayCanvas.nativeElement.width = this.img.nativeElement.width;
    // console.log(this.img.nativeElement);
    console.log(this.img.nativeElement.width);
    // console.log(this.overlayCanvas.nativeElement.height);
    console.log(this.overlayCanvas.nativeElement.width);
  }

}
