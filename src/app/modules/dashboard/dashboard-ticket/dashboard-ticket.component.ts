import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'dashboard-ticket',
	templateUrl: './dashboard-ticket.component.html',
	styleUrls: ['./dashboard-ticket.component.scss'],
})
export class DashboardTicketComponent implements OnInit {
	constructor() {}
	public chartTicket = {};
	ngOnInit(): void {
		this.chartTicket = {
			labels: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
			datasets: [
				{
					label: 'Tickets',
					data: [100, 100, 80, 70, 90],
					fill: false,
					borderColor: 'rgb(255, 99, 132)',
					tension: 0.1,
				},
			],
		};
	}
}
