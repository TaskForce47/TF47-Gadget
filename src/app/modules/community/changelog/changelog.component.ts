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
			borderWidth: 1,
			zoomType: 'x',
			panKey: 'shift',
			panning: {
				enabled: true,
			},
		},
		title: {
			text: 'Changelog',
		},
		xAxis: {
			type: 'datetime',
			lineWidth: 1,
			labels: {
				enabled: true,
				formatter() {
					return dayjs.unix(this.value).format('DD.MM.YY H:m:s');
				},
			},
		},
		yAxis: {
			width: 40,
			labels: {
				enabled: false,
			},
			title: {
				text: null,
			},
		},
		legend: {
			enabled: false,
		},
		credits: {
			enabled: false,
		},
		tooltip: {
			enabled: false,
		},
		plotOptions: {
			timeline: {
				dataLabels: {
					align: 'left',
					distance: 20,
				},
			},
		},
		series: [],
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
					x: dayjs(changelog.timeReleased).unix(),
					dataLabels: {
						enabled: true,
					},
				});
			});
			this.chartOptions.series.push({
				type: 'timeline',
				data: changelogtmp,
				dataLabels: {
					alternate: false,
					enabled: false,
					allowOverlap: false,
				},
				marker: {
					symbol: 'circle',
				},
			});
			this.ready = true;
		});
	}
}
