import { Component, OnInit } from '@angular/core';
import { User } from '../../../core/models/Gadget';
import { AuthService } from '../../../core/services/auth.service';

@Component({
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
	public user: User;
	constructor(private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.details$.subscribe((user) => {
			this.user = user;
		});
	}
}
