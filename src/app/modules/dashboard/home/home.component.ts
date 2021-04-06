import { Component, OnInit } from '@angular/core';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	private connection: HubConnection;
	constructor(private mnotificationService: MessageService) {}
	chartOptions: Highcharts.Options = {
		title: { text: '' },
		series: [
			{
				type: 'line',
				name: 'Spieler',
				data: [16, 20, 21, 20, 21],
			},
		],
		xAxis: {
			categories: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
		},
		credits: {
			enabled: false,
		},
	};
	chartOptionsTicket: Highcharts.Options = {
		title: { text: '' },
		series: [
			{
				type: 'line',
				name: 'Tickets',
				data: [100, 100, 80, 70, 90],
			},
		],
		xAxis: {
			categories: ['10.03 13:00', '10.03 14:00', '10.03 15:00', '10.03 16:00', '10.03 17:00'],
		},
		credits: {
			enabled: false,
		},
	};

	public defaultHeaders: any = [];
	public loading: any;
	public data: any = [];
	public headers: any = [];
	ngOnInit(): void {
		this.connection = new signalR.HubConnectionBuilder().withUrl('https://beta.taskforce47.com/shoutbox').build();
		this.connection.start().then(() => {
			this.mnotificationService.add({ severity: 'success', summary: 'Websocket connected' });
		});
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

	sendMessage() {
		this.connection.invoke('SendMessage', 'Ciao').then((res) => {
			console.log(res);
			this.connection.invoke('GetHistory').then((res1) => {
				console.log(res1);
			});
		});
	}
}
