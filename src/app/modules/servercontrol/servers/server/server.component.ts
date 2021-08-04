import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { GameServer } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-server',
	templateUrl: './server.component.html',
	styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
	public subnaviItems: MenuItem[] = [
		{
			label: 'Profile',
			routerLink: 'profile',
			routerLinkActiveOptions: { exact: true },
		},
		/*		{
			label: 'Settings',
			routerLink: 'settings',
			routerLinkActiveOptions: { exact: true },
		},*/
	];
	public loading: boolean = true;
	public server: GameServer;
	public id: number;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.loadServer();
		});
	}

	loadServer() {
		this.loading = true;
		this.http.get('/GameServer/' + this.id, { withCredentials: true }).subscribe((res: GameServer) => {
			this.server = res;
			this.loading = false;
		});
	}
}
