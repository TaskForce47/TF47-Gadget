import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Group } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './group-profile.component.html',
	styleUrls: ['./group-profile.component.scss'],
})
export class GroupProfileComponent implements OnInit {
	public loading: boolean = true;
	public group: Group;
	public id: number;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Members',
			routerLink: 'member',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Permissions',
			routerLink: 'permission',
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
			this.loadGroup();
		});
	}

	public loadGroup() {
		this.loading = true;
		this.http.get('/Group/' + this.id, { withCredentials: true }).subscribe((group: Group) => {
			this.group = group;
			this.loading = false;
		});
	}
}
