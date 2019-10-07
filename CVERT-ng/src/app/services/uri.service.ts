import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UriService implements OnInit {

  topImageUri: string;
  bottomImageUri: string;;

  constructor() {
  }

  ngOnInit() {
    this.topImageUri = "../assets/cache/test.JPG";
    this.bottomImageUri = "../assets/cache/test.JPG";
  }

  getTopImageUri() {
    return this.topImageUri;
  }


  getBottomImageUri() {
    return this.bottomImageUri;
  }
}
