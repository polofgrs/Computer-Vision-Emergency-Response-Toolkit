import { Component, OnInit, Input } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';

@Component({
  selector: 'app-image-tab',
  templateUrl: './image-tab.component.html',
  styleUrls: ['./image-tab.component.scss']
})
export class ImageTabComponent implements OnInit {

  @Input() image: ImageInstance;

  constructor() { }

  ngOnInit() {
  }

}
