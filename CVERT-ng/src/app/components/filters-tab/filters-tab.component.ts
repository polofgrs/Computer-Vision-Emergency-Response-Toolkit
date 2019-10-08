import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Filter } from '../../classes/filter';

import Jimp from 'jimp';
import * as assets from '../../../assets/assets.json';

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
    this.filtersList.push(new Filter(assets.filters[0]));
    this.filterListChange.emit(this.filtersList);
    this.currentFilter = this.filtersList[this.filtersList.length-1];
    this.currentFilterChange.emit(this.currentFilter);
    // console.log('add filter');
  }

  editFilter(filter: Filter) {
    this.currentFilter = filter;
    this.currentFilterChange.emit(this.currentFilter);
    // console.log(filter);
  }

  removeFilterFromList(filter: Filter) {
    if (this.currentFilter == filter) {
      this.currentFilter = undefined;
      this.currentFilterChange.emit(this.currentFilter);
    }
    this.filtersList.splice(this.filtersList.indexOf(filter), 1);
    this.filterListChange.emit(this.filtersList);
    // console.log(filter);
  }

}
