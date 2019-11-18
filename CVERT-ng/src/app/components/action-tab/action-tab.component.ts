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

  private inputLabel = "Input";
  private outputLabel = "Output";

  private inputFiles: string[];
  private outputDir: string;

  constructor(private fileService: FileService,
              private serverService: ServerService,
              private gisService: GisService) { }

  ngOnInit() { }

  async openImage(event: any) {
    if(event.target.files && event.target.files.length) {
      var path = event.target.files[0].path;
      // console.log(event.target.files[0].path);
      this.topImage = new ImageInstance();
      await this.topImage.update(path, this.gisService);
      this.topImageChange.emit(this.topImage);
      this.bottomImage = new ImageInstance();
      await this.bottomImage.update(path, this.gisService);
      this.bottomImageChange.emit(this.bottomImage);
    }
  }

  saveImage() {
    this.fileService.saveImage(this.bottomImage);
  }

  getInputFiles() {
    this.fileService.getIntputFiles().then((filePaths) => {
      if (filePaths.length > 0) {
        console.log(filePaths);
        this.inputFiles = filePaths;
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
        var dirSplit = dirPath.split('/');
        this.outputLabel = 'Out: ' + dirSplit[dirSplit.length - 1];
      } else {
        console.log('no output folder selected');
      }
    });
  }

  async applyFilters() {
    for (var filePath of this.inputFiles) {
      var image = new ImageInstance();
      await image.update(filePath, this.gisService);
      await image.applyFilterList(this.filtersList, this.serverService).then(async (result) => {
        await image.update(result, image.gisService).then(async (res) => {
          var pathSplit = filePath.split('/');
          pathSplit = pathSplit[pathSplit.length - 1].split('.');
          var name = pathSplit[pathSplit.length - 2] + '-mod.' + pathSplit[pathSplit.length - 1];
          var imagePath = this.outputDir + '/' + name;
          console.log(imagePath);
          await this.fileService.saveImageToPath(image, imagePath);
        });
      })
    }
  }

  async applyGPS() {
    var result = await this.serverService.sendGPSRequest(this.inputFiles, this.outputDir, this.gisService.gis);
    console.log(result);
  }

}
