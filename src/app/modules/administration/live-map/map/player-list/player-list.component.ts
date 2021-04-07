import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-player-list',
	templateUrl: './player-list.component.html',
	styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit {
	public players = [];
	public playersFiltered = [
		{
			name: 'Farming Group',
			side: 'AAF',
			member: [
				{ name: 'BlackPixxel', status: 'alive', role: 'engineer' },
				{ name: 'RednecksRevenge', status: 'alive', role: 'rifleman' },
				{ name: 'Symrex', status: 'dead', role: 'rifleman' },
				{ name: 'DonaldMcRonald', status: 'unconscious', role: 'medic' },
			],
		},
		{
			name: 'Panther',
			side: 'AAF',
			member: [
				{ name: 'Elefant statt Vaterland', status: 'alive', role: 'rifleman' },
				{ name: 'Der Saxe', status: 'alive', role: 'rifleman' },
				{ name: '[GNC]Paolo', status: 'alive', role: 'rifleman' },
				{ name: 'Oes', status: 'alive', role: 'medic' },
			],
		},
		{
			name: 'Alpaka Alpha',
			side: 'CSAT',
			member: [
				{ name: '[B2F] Vitaly Kaminski', status: 'alive', role: 'medic' },
				{ name: '[B2F] Vadi Kaminski', status: 'alive', role: 'rifleman' },
				{ name: 'KalleK', status: 'alive', role: 'sniper' },
				{ name: 'Preacher', status: 'alive', role: 'rifleman' },
			],
		},
	];
	loading: boolean = true;
	constructor() {}

	ngOnInit(): void {
		setTimeout(() => {
			this.loading = false;
		}, 1000);
	}
}
