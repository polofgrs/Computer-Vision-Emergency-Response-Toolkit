import { Component, OnInit, Input } from '@angular/core';

import { Filter } from '../../classes/filter';

@Component({
  selector: 'app-filter-edit-tab',
  templateUrl: './filter-edit-tab.component.html',
  styleUrls: ['./filter-edit-tab.component.scss']
})
export class FilterEditTabComponent implements OnInit {

  @Input() currentFilter: Filter;

  constructor() { }

  ngOnInit() {
  }

}
