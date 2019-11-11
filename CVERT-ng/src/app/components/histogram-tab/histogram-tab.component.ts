import { Component, OnInit, Input, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-histogram-tab',
  templateUrl: './histogram-tab.component.html',
  styleUrls: ['./histogram-tab.component.scss']
})
export class HistogramTabComponent implements OnInit, OnChanges {

  @Input() histogramData: number[][];
  @ViewChild("histogramCanvas", {static: true}) histogramCanvas: ElementRef;

  chart: Chart;
  labels: Array<number>;

  constructor() { }

  ngOnInit() {
    this.labels = new Array(255);
    for (var i=0; i<this.labels.length; i++) {
      this.labels[i] = i;
    }
    this.chart = new Chart(this.histogramCanvas.nativeElement, {
      type: "line",
      data: {
        labels: this.labels,
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: {
            left: 20,
            right: 20,
            top: 20,
            bottom: 20
          }
        },
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

  ngOnChanges(changes: SimpleChanges) {
    if (changes['histogramData'].currentValue) {
      this.chart.data.datasets = [{
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
      this.chart.update();
    }
  }

}
