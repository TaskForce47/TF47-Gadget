import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
	templateUrl: './user-groups.component.html',
	styleUrls: ['./user-groups.component.scss'],
})
export class UserGroupsComponent implements OnInit, OnDestroy {
	public headers: any = [];
	public defaultHeaders: any = [];
	public loadingGroups: boolean = true;
	public groups: Group[];
	public routeSubscription: Subscription;
	public id: number;
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'description'];
		this.headers.push(
			{ field: 'groupId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' }
		);
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.id = res.id;
			this.loadGroups();
		});
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

	loadGroups() {
		this.loadingGroups = true;
		this.http.get('/Group/user/' + this.id, { withCredentials: true }).subscribe((res: Group[]) => {
			this.groups = res;
			this.loadingGroups = false;
		});
	}
}
