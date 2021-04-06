import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
	selector: 'app-tf47-chart',
	templateUrl: './tf47-chart.component.html',
	styleUrls: ['./tf47-chart.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class Tf47ChartComponent implements OnInit {
	constructor() {}
	Highcharts: typeof Highcharts = Highcharts; // required
	chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
	@Input() chartOptions: Highcharts.Options = {}; // required
	@Input() updateFlag: boolean = false; // optional boolean
	@Input() oneToOneFlag: boolean = true; // optional boolean, defaults to false
	@Input() runOutsideAngular: boolean = false; // optional boolean, defaults to false
	// tslint:disable-next-line:only-arrow-functions
	chartCallback: Highcharts.ChartCallbackFunction = function (chart) {
		return null;
	}; // optional function, defaults to null

	ngOnInit(): void {}
}
