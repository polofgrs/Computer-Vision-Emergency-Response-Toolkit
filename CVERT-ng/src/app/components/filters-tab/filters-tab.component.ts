import { Component, OnInit, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Filter } from '../../classes/filter';

import Jimp from 'jimp';

@Component({
  selector: 'app-filters-tab',
  templateUrl: './filters-tab.component.html',
  styleUrls: ['./filters-tab.component.scss']
})
export class FiltersTabComponent implements OnInit {

  @Input() topImageUri: string;
  @Input() bottomImageUri: string;

  @Input() filtersList: Array<Filter>;

  sourceImage: Jimp;

  constructor() { }

  ngOnInit() {
    this.loadSourceImage();
  }

  loadSourceImage() {
    Jimp.read(this.topImageUri)
      .then(image => {
        this.sourceImage = image;
        console.log(image);
      })
      .catch(err => {
        console.log(err);
      })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.filtersList, event.previousIndex, event.currentIndex);
    console.log(this.filtersList);
  }

}
