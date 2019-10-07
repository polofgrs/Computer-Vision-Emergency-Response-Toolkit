import { Injectable, OnInit } from '@angular/core';
import { Filter } from '../classes/filter';

@Injectable({
  providedIn: 'root'
})
export class FiltersService implements OnInit {

  filtersList: Array<Filter>;
  currentFilter: Filter;

  constructor() {
  }

  ngOnInit() {
    this.currentFilter = new Filter('testFilter');
    this.filtersList = [this.currentFilter, new Filter('testFilter2'), new Filter('testFilter3')];
  }

  getFiltersList() {
    return this.filtersList;
  }

  getCurrentFilter() {
    return this.currentFilter;
  }

  setFiltersList(list: Array<Filter>) {
    this.filtersList = list;
  }
  
  setCurrentFilter(filter: Filter) {
    this.currentFilter = filter;
  }

}
