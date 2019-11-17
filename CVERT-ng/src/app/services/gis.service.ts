import { Injectable } from '@angular/core';

import { GisData } from '../classes/gisData'

@Injectable({
  providedIn: 'root'
})
export class GisService {

  gis: GisData;
  private radius = 6371000; // earth radius, in m

  constructor() { }

  setGis(gis: GisData) {
    this.gis = gis;
  }

  getGPS(x: number, y: number) {
    var posUAS = this.latLonToXY(this.gis.latitude, this.gis.longitude);
    var relHdg = Math.atan(- x / y); // in rad
    var fullHdg = this.gis.heading * Math.PI/180 + relHdg; // in rad
    var dist = Math.sqrt(x*x + y*y); // in  m
    var trgtX = posUAS[0] + dist * Math.sin(fullHdg);
    var trgtY = posUAS[1] + dist * Math.cos(fullHdg);
    var posTrgt = this.xyToLatLon(trgtX, trgtY);
    this.gis.markerLat = posTrgt[0];
    this.gis.markerLon = posTrgt[1];
  }

  latLonToXY(lat: number, lon: number) {
    var y = this.radius * lat * Math.PI/180;
    var x = this.radius * lon * Math.PI/180 * Math.cos(lat * Math.PI/180);
    return([x, y]);
  }

  xyToLatLon(x: number, y: number) {
    var lat = (y / this.radius) * (180 / Math.PI);
    var lon = (x / (this.radius * Math.cos(y / this.radius))) * (180 / Math.PI);
    return([lat, lon]);
  }
}
