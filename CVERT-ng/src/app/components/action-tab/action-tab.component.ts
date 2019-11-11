import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ImageInstance } from '../../classes/imageInstance';
import { Filter } from '../../classes/filter';

import { FileService } from '../../services/file.service';
import { ServerService } from '../../services/server.service';
import { GisService } from '../../services/gis.service';

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

  @Input() filtersList: Array<Filter>;
  @Output() filtersListChange = new EventEmitter();

  private inputFiles = "Choose input files";
  private outputFolder = "Choose output folder";

  constructor(private fileService: FileService,
              private serverService: ServerService,
              private gisService: GisService) { }

  ngOnInit() { }

  openImage(event: any) {
    if(event.target.files && event.target.files.length) {
      var path = event.target.files[0].path;
      // console.log(event.target.files[0].path);
      this.topImage = new ImageInstance(path, this.gisService);
      this.topImageChange.emit(this.topImage);
      this.bottomImage = new ImageInstance(path, this.gisService);
      this.bottomImageChange.emit(this.bottomImage);
    }
  }

  saveImage() {
    this.fileService.saveImage(this.bottomImage);
  }

  onInputChange(event: any) {
    console.log(event.target.files);
    this.inputFiles = event.target.files;
    // TODO : update display
  }

  onOutputChange(event: any) {
    console.log(event.target.files);
    this.outputFolder = event.target.files;
    // TODO : update display
    // TODO : when folder empty, the path cannot display...
    // Maybe go through IPC w/ Electron ?
  }

  applyFilters() {
    console.log('apply filters');
    // TODO : send instruction to server
  }

  applyGPS() {
    console.log('apply GPS');
    // TODO : code algorithm to find GPS
    // in all images of inputFiles
  }

}
