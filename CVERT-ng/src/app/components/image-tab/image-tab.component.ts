import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image-tab',
  templateUrl: './image-tab.component.html',
  styleUrls: ['./image-tab.component.scss']
})
export class ImageTabComponent implements OnInit {

  @Input() uri: string;

  constructor() { }

  ngOnInit() {
  }

}
