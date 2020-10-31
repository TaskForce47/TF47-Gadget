import { Component, OnInit } from '@angular/core';
import { AuthService, UserDetails } from '../../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-account',
	templateUrl: './account.component.html',
	styleUrls: ['./account.component.scss'],
})
export class AccountComponent implements OnInit {
	public userDetails: UserDetails;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Profile',
			routerLink: 'profile',
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
		this.auth.details$.subscribe((res) => {
			this.userDetails = res;
		});
	}
}
