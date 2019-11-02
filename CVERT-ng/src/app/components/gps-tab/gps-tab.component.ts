import { Component, OnInit, Input } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';

@Component({
  selector: 'app-gps-tab',
  templateUrl: './gps-tab.component.html',
  styleUrls: ['./gps-tab.component.scss']
})
export class GpsTabComponent implements OnInit {

  @Input() image: ImageInstance;

  constructor() {
  }

  ngOnInit() {
  }

}
