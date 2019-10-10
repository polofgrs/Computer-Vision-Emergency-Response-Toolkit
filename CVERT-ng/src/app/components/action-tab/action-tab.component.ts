import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';

@Component({
  selector: 'app-action-tab',
  templateUrl: './action-tab.component.html',
  styleUrls: ['./action-tab.component.scss']
})
export class ActionTabComponent implements OnInit {

  @Input() topImage: ImageInstance;
  @Output() topImageChange = new EventEmitter();

  @Input() bottomImage: ImageInstance;
  @Output() bottomImageChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  openImage() {
    console.log("open image");
  }

  saveImage() {
    console.log("save image");
  }

}
