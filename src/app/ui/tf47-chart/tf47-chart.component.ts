import { AfterViewInit, Component, Input, OnInit, SimpleChanges, ViewEncapsulation } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
	selector: 'tf47-chart',
	templateUrl: './tf47-chart.component.html',
	styleUrls: ['./tf47-chart.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class Tf47ChartComponent implements AfterViewInit {
	constructor() {}
	@Input() type;
	@Input() data;
  private chart: Chart;
  public chartId = Math.floor(Math.random() * 999999999 - 0);
  ngOnChanges(changes: SimpleChanges) {
    if(changes.data && !changes?.data.firstChange){
      this.chart.data = this.data;
      this.chart.update();
    }
  }

  ngAfterViewInit(){
    const canvas = <HTMLCanvasElement>document.getElementById('chart_'+this.chartId);
		const ctx = canvas.getContext('2d');
		this.chart = new Chart(ctx, {
      type: this.type,
      data: this.data,
      options: {
          scales: {
              x: {
                  stacked: true
              },
              y: {
                  stacked: true
              }
          }
      }
		});
    this.chart.color = "#FFFFFF";
  }

}
