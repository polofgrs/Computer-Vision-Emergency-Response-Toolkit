import { Injectable } from '@angular/core';

import { GisData } from '../classes/gisData'

@Injectable({
  providedIn: 'root'
})
export class GisService {

  private gis: GisData;

  constructor() { }

  setGis(gis: GisData) {
    this.gis = gis;
  }

  getGPS(x: number, y: number) {
    // TODO : convert X, Y to lat, lon with GIS data
    this.gis.markerLat = x;
    this.gis.markerLon = y;
    console.log(this.gis);
  }
}
