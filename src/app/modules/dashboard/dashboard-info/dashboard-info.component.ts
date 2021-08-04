import { Component, Input, OnInit } from '@angular/core';
import { GameServer } from '../../../core/models/Gadget';

@Component({
	selector: 'dashboard-info',
	templateUrl: './dashboard-info.component.html',
	styleUrls: ['./dashboard-info.component.scss'],
})
export class DashboardInfoComponent implements OnInit {
	constructor() {}
	@Input() server: GameServer;
	ngOnInit(): void {}
}
