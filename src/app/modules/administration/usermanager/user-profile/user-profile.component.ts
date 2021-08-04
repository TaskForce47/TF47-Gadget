import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { User } from '../../../../core/models/Gadget';
import { PermissionService } from '../../../../core/services/permission.service';
import { ModalComponent } from '../../../../ui/modal/modal.component';

@Component({
	templateUrl: './user-profile.component.html',
	styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: HttpClient,
		public permissionService: PermissionService
	) {}
	public userId: number | undefined | string;
	public user: User;
	public loading: boolean = false;
	public routeSubscription: Subscription;
	@ViewChild('banModal') banModal: ModalComponent;
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
	public action: string;
	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.params.subscribe((res) => {
			this.userId = res.id;
			this.loadUser();
		});
	}
	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

	public loadUser() {
		this.loading = true;
		this.http.get('/user/' + this.userId, { withCredentials: true }).subscribe((res: User) => {
			this.user = res;
			this.loading = false;
		});
	}

	openBanModal(action: string) {
		this.action = action;
		this.banModal.open();
	}

	ban() {
		this.http.post('/user/' + this.userId + '/ban', {}, { withCredentials: true }).subscribe(() => {
			this.loadUser();
		});
	}

	unban() {
		this.http.post('/user/' + this.userId + '/unban', {}, { withCredentials: true }).subscribe(() => {
			this.loadUser();
		});
	}
}
