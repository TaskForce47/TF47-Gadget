import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-player-controls',
	templateUrl: './player-controls.component.html',
	styleUrls: ['./player-controls.component.scss'],
})
export class PlayerControlsComponent implements OnInit {
	speed = [
		{ name: '1x', code: 1 },
		{ name: '10x', code: 10 },
		{ name: '100x', code: 100 },
	];
	selectedSpeed: { name: string; code: number } = { name: '1x', code: 1 };
	play: boolean;
	time: number = 0;
	public endDate = new Date('2021-03-11T22:33:22.417815Z');
	constructor() {}

	ngOnInit(): void {}
}
