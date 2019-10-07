import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Output() topImageUriChange = new EventEmitter();
  
  @Input() bottomImageUri: string;
  @Output() bottomImageUriChange = new EventEmitter();

  @Input() filtersList: Array<Filter>;
  @Output() filterListChange = new EventEmitter();

  @Input() currentFilter: Filter;
  @Output() currentFilterChange = new EventEmitter();

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
    this.filterListChange.emit(this.filtersList);
  }

  addFilter() {
    console.log('add filter');
  }

  editFilter(filter: Filter) {
    this.currentFilter = filter;
    console.log(filter);
    this.currentFilterChange.emit(this.currentFilter);
  }

  removeFilterFromList(filter: Filter) {
    console.log(filter);
  }

}
