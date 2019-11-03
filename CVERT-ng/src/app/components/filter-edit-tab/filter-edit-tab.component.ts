import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Filter } from '../../classes/filter';
import * as assets from '../../../assets/assets.json';
import { FileService } from '../../services/file.service';

@Component({
  selector: 'app-filter-edit-tab',
  templateUrl: './filter-edit-tab.component.html',
  styleUrls: ['./filter-edit-tab.component.scss']
})
export class FilterEditTabComponent implements OnInit {

  @Input() currentFilter: Filter;
  @Output() currentFilterChange = new EventEmitter();

  filters: any;
  serverFilters: any;
  allFilters: any;

  constructor(private fileService: FileService) {
    this.filters = assets.filters;
    this.serverFilters = assets.serverFilters;
    this.allFilters = this.filters.concat(this.serverFilters);
  }

  ngOnInit() {
  }

  changeFilter() {
    this.currentFilter.filter = JSON.parse(JSON.stringify(
      this.allFilters.find(
        filterItem => {
          return filterItem.name == this.currentFilter.filter.name;
        }
      )
    ));
    this.currentFilterChange.emit(this.currentFilter);
  }

  openParameters() {
    this.fileService.openParameters();
  }

}
