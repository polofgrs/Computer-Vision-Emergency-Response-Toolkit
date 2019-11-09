import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';
import { CanvasService } from '../../services/canvas.service';

@Component({
  selector: 'app-image-tab',
  templateUrl: './image-tab.component.html',
  styleUrls: ['./image-tab.component.scss']
})
export class ImageTabComponent implements OnInit {

  @Input() image: ImageInstance;
  @ViewChild("img", {static: false}) img: ElementRef;
  @ViewChild("overlayCanvas", {static: false}) overlayCanvas: ElementRef;

  constructor(private canvasService: CanvasService) { }

  ngOnInit() {
  }

  onImageLoad() {
    // TODO :
    // WebGL error when loading new image.
    // probably scene.dispose(), bun when to trigger it ?
    if (!this.canvasService.isInit()) {
      this.canvasService.createScene(this.overlayCanvas);
      this.canvasService.animate();
    }
    this.resizeCanvas();
  }

  resizeCanvas() {
    if (typeof this.img !== "undefined" && typeof this.overlayCanvas !== "undefined") {
      this.overlayCanvas.nativeElement.height = this.img.nativeElement.height;
      this.overlayCanvas.nativeElement.width = this.img.nativeElement.width;
      this.canvasService.resize();
    }
  }

}
