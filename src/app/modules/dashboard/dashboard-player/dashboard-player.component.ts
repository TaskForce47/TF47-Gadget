import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dashboard-player',
	templateUrl: './dashboard-player.component.html',
	styleUrls: ['./dashboard-player.component.scss'],
})
export class DashboardPlayerComponent implements OnInit {
	constructor() {}
	public chartPlayer = {};
	ngOnInit(): void {
		this.chartPlayer = {
			labels: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
			datasets: [
				{
					label: 'Player',
					data: [16, 20, 21, 20, 21],
					fill: false,
					borderColor: 'rgb(255, 99, 132)',
					tension: 0.1,
				},
			],
		};
	}
}
