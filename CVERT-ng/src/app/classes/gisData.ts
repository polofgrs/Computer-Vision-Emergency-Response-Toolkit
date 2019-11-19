import { GisService } from '../services/gis.service';

export class GisData {

  altitude: number;
  altitudeUnit: string; // feet or meters

  fov: number; // degrees DIAGONAL !
  fovPreset: string;
  pitch: number; // degrees

  positionUnit: string; // gps or usng
  latitude: number;
  longitude: number;
  heading: number; // degrees

  gisService: GisService;

  markerLat: number;
  markerLon: number;

  markerUSNG: string;

  constructor(path: string, gisService: GisService) {
    this.gisService = gisService;
    this.getGISdataFromPath(path, gisService);
    this.altitudeUnit = "meters"
    this.positionUnit = "gps";
    this.fovPreset = "custom";
    this.fov = 94; // P3 diagonal FOV
  }

  getGISdataFromPath(path: string, gisService: GisService) {
    const ipc = (<any>window).require('electron').ipcRenderer;
    ipc.once("getGISdataResponse", (event, gisData) => {
      if (gisData != {}) {
        // console.log(gisData);
        this.altitude = gisData.RelativeAltitude;
        this.latitude = gisData.GpsLatitude;
        this.heading = gisData.GimbalYawDegree;
        this.pitch = gisData.GimbalPitchDegree;
        if (typeof gisData.GpsLongitude !== 'undefined') { // DJI has a typo in XMP data
          this.longitude = gisData.GpsLongitude;
        } else {
          this.longitude = gisData.GpsLongtitude;
        }
      } else {
        this.altitude = 0;
        this.latitude = 0;
        this.longitude = 0;
        this.heading = 0;
        this.pitch = -90;
      }
      this.gisService.setGis(this);
    });
    ipc.send("getGISdata", path);
  }

  serMarkerPos(lat: number, lon: number) {
    this.markerLat = lat;
    this.markerLon = lon;
  }

}
