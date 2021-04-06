import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_timeLine from 'highcharts/modules/timeline';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';
HC_timeLine(Highcharts);

@Component({
	selector: 'app-changelog',
	templateUrl: './changelog.component.html',
	styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit {
	Highcharts: typeof Highcharts = Highcharts;
	chartOptions: Highcharts.Options = {
		chart: {
			inverted: true,
			type: 'timeline',
			zoomType: 'x',
		},
		title: {
			text: 'Changelog',
		},
		xAxis: {
			type: 'datetime',
			visible: false,
		},
		yAxis: {
			gridLineWidth: 1,
			title: null,
			labels: {
				enabled: false,
			},
		},
		legend: {
			enabled: false,
		},
		credits: {
			enabled: false,
		},
		tooltip: {
			style: {
				width: 300,
			},
		},
		series: [
			{
				type: 'timeline',
				data: [],
				marker: {
					symbol: 'circle',
				},
			},
		],
	};
	public ready: boolean = false;
	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get('/changelog').subscribe((changelogs: Array<any>) => {
			const changelogtmp = [];
			changelogs.forEach((changelog) => {
				changelogtmp.push({
					name: changelog.title,
					label: changelog.text,
					description: changelog.text,
					y: dayjs(changelog.timeReleased).unix(),
				});
			});
			this.chartOptions.series.push({
				type: 'timeline',
				data: changelogtmp,
			});
			this.ready = true;
		});
	}
}
