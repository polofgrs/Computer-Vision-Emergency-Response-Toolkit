import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServerService {

  ip: string;
  port: string;

  constructor(private http: HttpClient) {
    this.reset();
  }

  reset() {
    this.ip = '127.0.0.1';
    this.port = '5000';
  }

  getAssets() {
    this.http.get('assets/assets.json').subscribe(jsonParam => {
      console.log(jsonParam);
    });
  }

  send(algorithm: any,
        sourcePath: string,
        targetPath: string) : Promise<any> {
    var that = this;
    return new Promise(function(resolve, reject) {
      that.http.get('assets/assets.json').subscribe(jsonParam => {
        let jsonData = that.getJsonFromParam(algorithm, sourcePath, targetPath, jsonParam['algorithmParameters']);
        let httpHeaders = new HttpHeaders({
          'Content-Type' : 'application/json'
    	  });
        let url = 'http://' + that.ip + ':' + that.port;
        that.http.post<any>(url, jsonData, {headers: httpHeaders})
        .subscribe((data) => {
          console.log(data);
          resolve(data);
        })
      });
    })
  }

  getJsonFromParam(algorithm: any,
                    sourcePath: string,
                    targetPath: string,
                    jsonData: any) {
    var result = {
      "algorithm": algorithm,
      "sourcePath": sourcePath,
      "targetPath": targetPath,
      "parameters": this.getAlgoParametersFromJson(jsonData)
    }
    return result;
  }

  getAlgoParametersFromJson(jsonData) {
    var result = {};
    for (let param of jsonData) {
      if (param.useDefault) {
        var value = param.defaultValue;
      } else {
        var value = param.userValue;
      }
      result[param.name] = value;
    }
    return result;
  }

}
