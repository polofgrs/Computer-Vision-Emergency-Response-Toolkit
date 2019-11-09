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

  canvasService: CanvasService;

  constructor() { }

  ngOnInit() {
  }

  onImageLoad() {
    this.canvasService = new CanvasService(this.overlayCanvas.nativeElement);
    // TODO :
    // WebGL error when loading new image.
    // probably scene.dispose(), bun when to trigger it ?
    this.refreshCanvas();
    this.canvasService.drawScene();
  }

  refreshCanvas() {
    this.resizeCanvas();
  }

  resizeCanvas() {
    this.overlayCanvas.nativeElement.height = this.img.nativeElement.height;
    this.overlayCanvas.nativeElement.width = this.img.nativeElement.width;
    this.canvasService.resize();
  }

}
