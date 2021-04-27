import { Component, OnDestroy, OnInit } from '@angular/core';
import { Group } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderButton } from '../../../../ui/table/table.component';

@Component({
	templateUrl: './user-groups.component.html',
	styleUrls: ['./user-groups.component.scss'],
})
export class UserGroupsComponent implements OnInit {
	public headers: any = [];
	public defaultHeaders: any = [];
	public loadingGroups: boolean = true;
	public groups: Group[];
	public id: number;
	public headerButtonActions: HeaderButton[] = [{ title: 'View', action: 'view', permissions: [], selectable: true }];
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'description'];
		this.headers.push(
			{ field: 'groupId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' }
		);
		this.activatedRouter.parent.params.subscribe((res) => {
			this.id = res.id;
			this.loadGroups();
		});
	}

	loadGroups() {
		this.loadingGroups = true;
		this.http.get('/Group/user/' + this.id, { withCredentials: true }).subscribe((res: Group[]) => {
			this.groups = res;
			this.loadingGroups = false;
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'view':
				this.router.navigate(['/administration/groupmanager/', $event[2].groupId]);
				break;
		}
	}
}
