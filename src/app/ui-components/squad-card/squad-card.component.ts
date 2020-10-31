import { Component, Input, OnInit } from '@angular/core';
import { Squad } from '../../modules/account/account-profile/account-profile.component';

@Component({
	selector: 'app-squad-card',
	templateUrl: './squad-card.component.html',
	styleUrls: ['./squad-card.component.scss'],
})
export class SquadCardComponent implements OnInit {
	@Input() squad: Squad;
	constructor() {}

	ngOnInit(): void {}
}
