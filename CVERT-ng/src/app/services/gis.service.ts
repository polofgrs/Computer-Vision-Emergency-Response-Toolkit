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
    // https://www.movable-type.co.uk/scripts/latlong.html
    var relHdg = Math.atan(- x / y); // in rad
    var fullHdg = this.gis.heading * Math.PI/180 + relHdg; // in rad
    var dist = Math.sqrt(x*x + y*y); // in  m
    var latitude = Math.asin( Math.sin(this.gis.latitude*Math.PI/180)*Math.cos(dist/this.radius)
                + Math.cos(this.gis.latitude*Math.PI/180)*Math.sin(dist/this.radius)*Math.cos(fullHdg));
    var longitude = this.gis.longitude*Math.PI/180 + Math.atan2(Math.sin(fullHdg)*Math.sin(dist/this.radius)*Math.cos(this.gis.latitude*Math.PI/180),
                         Math.cos(dist/this.radius)-Math.sin(this.gis.latitude*Math.PI/180)*Math.sin(latitude));
    this.gis.markerLat = latitude * 180 / Math.PI;
    this.gis.markerLon = longitude * 180 / Math.PI;
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
