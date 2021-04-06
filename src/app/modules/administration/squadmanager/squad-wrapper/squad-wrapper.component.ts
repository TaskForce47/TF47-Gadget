import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Squad } from '../../../../models/Gadget';

@Component({
	selector: 'app-squad-wrapper',
	templateUrl: './squad-wrapper.component.html',
	styleUrls: ['./squad-wrapper.component.scss'],
})
export class SquadWrapperComponent implements OnInit {
	public loading: boolean = true;
	public squad: Squad;
	public id: number;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Members',
			routerLink: 'profile',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Settings',
			routerLink: 'settings',
			routerLinkActiveOptions: { exact: true },
		},
	];
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.loadSquad();
		});
	}

	loadSquad() {
		this.loading = true;
		this.http.get('/Squad/' + this.id, { withCredentials: true }).subscribe((res: Squad) => {
			this.squad = res;
			this.loading = false;
		});
	}
}
