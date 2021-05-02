import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor() {}

	public defaultHeaders: any = [];
	public loading: any;
	public data: any = [];
	public headers: any = [];
  public chartPlayer = {};
  public chartTicket = {};
	ngOnInit(): void {
    this.chartPlayer = {
      labels: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
      datasets: [{
        label: 'Player',
        data: [16, 20, 21, 20, 21],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }],
    };
    this.chartTicket = {
      labels: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
      datasets: [{
        label: 'Tickets',
        data: [100, 100, 80, 70, 90],
        fill: false,
        borderColor: 'rgb(255, 99, 132)',
        tension: 0.1
      }],
    };
		this.defaultHeaders = ['playerName', 'ticketCount'];
		this.headers.push({ field: 'playerName', header: 'Name' }, { field: 'ticketCount', header: 'Tickets' });
		this.data = [
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
			{
				playerName: 'BlackPixxel',
				ticketCount: 1337,
			},
		];
	}
}
