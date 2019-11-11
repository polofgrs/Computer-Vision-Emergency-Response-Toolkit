import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { GisData } from '../../classes/gisData';

import { CanvasService } from '../../services/canvas.service';
import { GisService } from '../../services/gis.service';

@Component({
  selector: 'app-gps-tab',
  templateUrl: './gps-tab.component.html',
  styleUrls: ['./gps-tab.component.scss']
})
export class GpsTabComponent implements OnInit {

  @Input() gisData: GisData;

  // wait for data init for change
  @ViewChild('altitude', {static: false}) set altitude(element) {
    if (element) {
      this.updateCanvas('altitude');
    }
  }
  @ViewChild('pitch', {static: false}) set pitch(element) {
    if (element) {
      this.updateCanvas('pitch');
    }
  }
  @ViewChild('fov', {static: false}) set fov(element) {
    if (element) {
      this.updateCanvas('fov');
    }
  }

  constructor(private canvasService: CanvasService,
              private gisService: GisService) {
  }

  ngOnInit() {
  }

  updateCanvas(property: string) {
    var value: number;
    switch(property) {
      case 'altitude':
        value = this.gisData.altitude;
        break;
      case 'pitch':
        value = this.gisData.pitch;
        break;
      case 'fov':
        value = this.gisData.fov;
        break;
      default:
        console.log('not a known property for canvas update');
    }
    if (typeof value !== 'undefined') {
      this.canvasService.updateGIS(property, value);
      this.gisService.setGis(this.gisData);
    }
  }

}
