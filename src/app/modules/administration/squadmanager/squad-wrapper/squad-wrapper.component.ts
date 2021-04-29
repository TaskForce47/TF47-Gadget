import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Squad } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-squad-wrapper',
	templateUrl: './squad-wrapper.component.html',
	styleUrls: ['./squad-wrapper.component.scss'],
})
export class SquadWrapperComponent implements OnInit {
	public loading: boolean = true;
	public squad: Squad;
	public id: number;
	public rebuildInProgress: boolean = false;
	public deleteInProgress: boolean = false;
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
	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private confirmationService: ConfirmationService,
		private router: Router
	) {}

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

	rebuildXml() {
		this.rebuildInProgress = true;
		this.http.post('/Squad/' + this.id + '/rebuild', {}, { withCredentials: true }).subscribe(
			() => {
				this.rebuildInProgress = false;
			},
			() => {
				this.rebuildInProgress = false;
			}
		);
	}

	public confirmDelete() {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.deleteInProgress = true;
				this.http.delete('/Squad/' + this.id, { withCredentials: true }).subscribe(() => {
					this.deleteInProgress = false;
					this.router.navigate(['../'], { relativeTo: this.activatedRoute });
				});
			},
		});
	}
}
