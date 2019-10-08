import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Filter } from '../../classes/filter';
import * as assets from '../../../assets/assets.json';

@Component({
  selector: 'app-filter-edit-tab',
  templateUrl: './filter-edit-tab.component.html',
  styleUrls: ['./filter-edit-tab.component.scss']
})
export class FilterEditTabComponent implements OnInit {

  @Input() currentFilter: Filter;
  @Output() currentFilterChange = new EventEmitter();

  filters: any;

  constructor() {
    this.filters = assets.filters;
    console.log(this.filters);
  }

  ngOnInit() {
  }

  changeFilter() {
    this.currentFilter.filter = JSON.parse(JSON.stringify(
      this.filters.find(
        filterItem => {
          return filterItem.name == this.currentFilter.filter.name;
        }
      )
    ));
    this.currentFilterChange.emit(this.currentFilter);
  }

}
