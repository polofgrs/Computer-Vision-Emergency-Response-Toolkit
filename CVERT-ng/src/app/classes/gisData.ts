// import { IpcRenderer } from 'electron'

export class GisData {

  altitude: number;
  altitudeUnit: string; // feet or meters

  fov: number; // degrees
  fovPreset: string;
  pitch: number; // degrees

  positionUnit: string; // gps or usgn
  latitude: number;
  longitude: number;
  heading: number; // degrees

  constructor(path: string) {
    this.getGISdataFromPath(path);
    this.altitudeUnit = "meters"
    this.positionUnit = "gps";
    this.fovPreset = "custom";
    this.fov = 70;
  }

  getGISdataFromPath(path: string) {
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
    });
    ipc.send("getGISdata", path);
  }

}
