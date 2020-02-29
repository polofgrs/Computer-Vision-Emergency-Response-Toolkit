import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import * as path from 'path';

import { ImageInstance } from '../../classes/imageInstance';
import { ImageFile } from '../../classes/imageFile';
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

  @Input() bottomImage: ImageInstance;

  @Input() filtersList: Array<Filter>;
  @Output() filtersListChange = new EventEmitter();

  @Input() inputFiles: ImageFile[];
  @Output() inputFilesChange = new EventEmitter();

  private inputLabel = "Input";
  private outputLabel = "Output";

  private outputDir: string;

  constructor(private fileService: FileService,
              private serverService: ServerService,
              private gisService: GisService) { }

  ngOnInit() { }

  /*async openImage(event: any) {
    if(event.target.files && event.target.files.length) {
      var path = event.target.files[0].path;
      // console.log(event.target.files[0].path);

    }
  }*/

  saveImage() {
    this.fileService.saveImage(this.bottomImage);
  }

  getInputFiles() {
    this.fileService.getIntputFiles().then((filePaths) => {
      if (filePaths.length > 0) {
        this.inputFiles = [];
        console.log(filePaths);
        for (let filePath of filePaths) {
          this.inputFiles.push(new ImageFile(filePath));
        }
        this.inputFilesChange.emit(this.inputFiles);
        this.inputLabel = 'In: ' + filePaths.length.toString() + ' files';
      } else {
        console.log('no input files selected');
      }
    });
  }

  getOutputDirectory() {
    this.fileService.getOutputDirectory().then((dirPath) => {
      if (dirPath !== '') {
        console.log(dirPath);
        this.outputDir = dirPath;
        var dirSplit = path.parse(dirPath);
        this.outputLabel = 'Out: ' + dirSplit.name;
      } else {
        console.log('no output folder selected');
      }
    });
  }

  async applyFilters() {
    for (var file of this.inputFiles) {
      var image = new ImageInstance();
      await image.update(file.path, this.gisService);
      await image.applyFilterList(this.filtersList, this.serverService).then(async (result) => {
        await image.update(result, image.gisService).then(async (res) => {
          var pathSplit = path.parse(file.path);
          var name = pathSplit.name + '-mod' + pathSplit.ext;
          var imagePath = path.join(this.outputDir, name);
          console.log(imagePath);
          await this.fileService.saveImageToPath(image, imagePath);
        });
      })
    }
  }

  async applyGPS() {
    let filePaths = [];
    for (let file of this.inputFiles) {
      filePaths.push(file.path);
    }
    var result = await this.serverService.sendGPSRequest(filePaths, this.outputDir, this.gisService.gis);
    console.log(result);
  }

}
