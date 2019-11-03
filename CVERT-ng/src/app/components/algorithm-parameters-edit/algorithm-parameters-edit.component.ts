import { Component, OnInit } from '@angular/core';

import * as assets from '../../../assets/assets.json';

@Component({
  selector: 'app-algorithm-parameters-edit',
  templateUrl: './algorithm-parameters-edit.component.html',
  styleUrls: ['./algorithm-parameters-edit.component.scss']
})
export class AlgorithmParametersEditComponent implements OnInit {

  algorithmParameters: any;

  constructor() {
    this.algorithmParameters = assets.algorithmParameters;
  }

  ngOnInit() {
  }

  onSave() {
    console.log(this.algorithmParameters);
  }

}
