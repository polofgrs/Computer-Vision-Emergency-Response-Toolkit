export class GisData {

  altitude: number;
  altitudeUnit: string; // m or ft

  fov: number; // degrees
  fovPreset: string;
  pitch: number; // degrees

  positionUnit: string; // gps or usgn
  latitude: number;
  longitude: number;
  heading: number; // degrees

  constructor(jimpObject) {
    try {
      console.log(jimpObject._exif);
      this.altitude = jimpObject._exif.tags.GPSAltitude;
      this.latitude = jimpObject._exif.tags.GPSLatitude;
      this.longitude = jimpObject._exif.tags.GPSLongitude;
    } catch(err) {
      console.log(err);
      this.altitude = 0;
      this.latitude = 0;
      this.longitude = 0;
    }
    this.altitudeUnit = "ft"
    this.positionUnit = "gps";
    this.fovPreset = "custom";
    this.fov = 0;
    this.pitch = 0;
    console.log(this);
  }

}
