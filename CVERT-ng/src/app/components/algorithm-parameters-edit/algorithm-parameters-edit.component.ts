import { Component, OnInit } from '@angular/core';

import * as assets from '../../../assets/assets.json';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-algorithm-parameters-edit',
  templateUrl: './algorithm-parameters-edit.component.html',
  styleUrls: ['./algorithm-parameters-edit.component.scss']
})
export class AlgorithmParametersEditComponent implements OnInit {

  algorithmParameters: any;

  constructor(private fileService: FileService) {
    this.algorithmParameters = assets.algorithmParameters;
  }

  ngOnInit() {
  }

  saveParameters() {
    console.log(this.algorithmParameters);
    this.fileService.saveAlgorithmParameters(this.algorithmParameters);
  }

}
