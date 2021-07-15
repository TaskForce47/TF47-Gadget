import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-servers',
	templateUrl: './servers.component.html',
})
export class ServersComponent implements OnInit {
	public gameserver = [
		{
			type: 'Gameserver',
			title: '[TF47] MilSim Public Server #1 ACE|TFAR|RHS GER/ENG',
			ip: 'arma.taskforce47.com:2302',
			img: './assets/images/a3_logo.png',
			connect: 'steam://connect/116.202.164.243:2302',
		},
	];

	public voiceserver = [
		{
			type: 'Teamspeak',
			title: 'Task Force 47',
			ip: 'ts3.taskforce47.com',
			img: './assets/images/teamspeak-3.svg',
			connect: 'ts3server://ts3.taskforce47.com',
		},
		{
			type: 'Discord',
			title: 'Task Force 47',
			ip: 'Invite: w5GKzbr',
			img: 'https://discord.com/assets/fc0b01fe10a0b8c602fb0106d8189d9b.png',
			connect: 'https://discord.gg/w5GKzbr',
		},
	];
	public shown = [];
	public selectedType: string;
	constructor() {}

	ngOnInit(): void {
		this.shown = [...this.gameserver, ...this.voiceserver];
	}

	selectServerType(type: string) {
		if (this.selectedType !== type) {
			this.selectedType = type;
			if (type === 'game') {
				this.shown = this.gameserver;
			} else {
				this.shown = this.voiceserver;
			}
		} else {
			this.selectedType = '';
			this.shown = [...this.gameserver, ...this.voiceserver];
		}
	}
}
