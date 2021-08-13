import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Mission } from '../../../../core/models/Gadget';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-event',
	templateUrl: './event.component.html',
	styleUrls: ['./event.component.scss'],
})
export class EventComponent implements OnInit {
	public subnaviItems: MenuItem[] = [
		{
			label: 'Profile',
			routerLink: 'profile',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Description',
			routerLink: 'description',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Slotting',
			routerLink: 'slotting',
			routerLinkActiveOptions: { exact: true },
		},
	];
	public loading: boolean = true;
	public mission: Mission;
	public id: number;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.loadMission();
		});
	}

	loadMission() {
		this.loading = true;
		this.http.get('/Mission/' + this.id, { withCredentials: true }).subscribe((res: Mission) => {
			this.mission = res;
			this.loading = false;
		});
	}
}
