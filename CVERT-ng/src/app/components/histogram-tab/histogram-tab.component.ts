import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-histogram-tab',
  templateUrl: './histogram-tab.component.html',
  styleUrls: ['./histogram-tab.component.scss']
})
export class HistogramTabComponent implements OnInit, OnChanges {

  @Input() histogramData: number[][];
  @ViewChild("histogramCanvas") histogramCanvas: ElementRef;

  chart: Chart;
  labels: Array<number>;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['histogramData'].currentValue) {
      console.log(this.histogramData[0]);
      this.chart = new Chart(this.histogramCanvas.nativeElement, {
        type: "line",
        data: {
          labels: this.labels,
          datasets: [{
            data: this.histogramData[0].slice(0,254),
            borderColor: '#ff0000'
          },
          {
            data: this.histogramData[1].slice(0,254),
            borderColor: '#00ff00'
          },
          {
            data: this.histogramData[2].slice(0,254),
            borderColor: '#0000ff'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0
            }
          },
          legend: {
            display: false
          },
          scales: {
            yAxes: [{
              ticks: {
                display: false
              }
            }],
            xAxes: [{
              ticks: {
                display: false
              }
            }]
          }
        }
      });
    }
  }

  ngOnInit() {
    this.labels = new Array(255);
    for (var i=0; i<this.labels.length; i++) {
      this.labels[i] = i;
    }
  }

}
