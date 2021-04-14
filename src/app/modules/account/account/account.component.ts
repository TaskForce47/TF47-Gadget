import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { MenuItem } from 'primeng/api';
import { User } from '../../../core/models/Gadget';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
	public userDetails: any;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Profile',
			routerLink: 'profile',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Api Keys',
			routerLink: 'keys',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Settings',
			routerLink: 'settings',
			routerLinkActiveOptions: { exact: true },
		},
	];
	constructor(private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.details$.subscribe((res: User) => {
			this.userDetails = res;
		});
	}
}
