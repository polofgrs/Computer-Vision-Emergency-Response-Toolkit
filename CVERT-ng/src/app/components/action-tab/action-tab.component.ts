import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';
import { FileService } from '../../services/file.service';

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

  constructor(private fileService: FileService) { }

  ngOnInit() { }

  openImage(event: any) {
    if(event.target.files && event.target.files.length) {
      var path = event.target.files[0].path;
      // console.log(event.target.files[0].path);
      this.topImage = new ImageInstance(path);
      this.topImageChange.emit(this.topImage);
      this.bottomImage = new ImageInstance(path);
      this.bottomImageChange.emit(this.bottomImage);
    }
  }

  saveImage() {
    this.fileService.saveImage(this.bottomImage);
    // console.log("save image");
  }

}
