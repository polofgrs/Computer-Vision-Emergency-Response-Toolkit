import { Component, OnInit } from '@angular/core';

import { ImageService } from './services/image.service';
import { Filter } from './classes/filter';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {

  topImageUri: string;
  topImageHistogram: number[][];

  bottomImageUri: string;
  bottomImageHistogram: number[][];

  filtersList: Array<Filter>;
  currentFilter: Filter;

  constructor(private imageService: ImageService) {
    this.topImageUri = "../assets/cache/test.JPG";
    this.bottomImageUri = "../assets/cache/test.JPG";
    // this.currentFilter = new Filter('testFilter');
    this.filtersList = new Array<Filter>();
  }

  ngOnInit() {

    this.imageService.getHistogram(this.topImageUri).subscribe( data => {
      this.topImageHistogram = data;
    });

    this.imageService.getHistogram(this.bottomImageUri).subscribe( data => {
      this.bottomImageHistogram = data;
    });
  }
}
