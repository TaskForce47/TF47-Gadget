import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { User } from '../../../../models/Gadget';

@Component({
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}
	public userId: number | undefined | string;
	public user: User;
	public loading: boolean = false;
	public routeSubscription: Subscription;
	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.params.subscribe((res) => {
			this.userId = res.id;
			this.loading = true;
			this.http.get('/user/' + this.userId, { withCredentials: true }).subscribe((res: User) => {
				this.user = res;
				this.loading = false;
			});
		});
	}
	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

	public subnaviItems: MenuItem[] = [
		{
			label: 'Groups',
			routerLink: 'groups',
		},
		{
			label: 'Api Keys',
			routerLink: 'keys',
		},
	];
}
