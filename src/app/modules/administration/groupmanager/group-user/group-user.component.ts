import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderButton, TableComponent } from '../../../../ui/table/table.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Group, SquadMember, User } from '../../../../core/models/Gadget';
import { ModalComponent } from '../../../../ui/modal/modal.component';

@Component({
	selector: 'app-group-user',
	templateUrl: './group-user.component.html',
	styleUrls: ['./group-user.component.scss'],
})
export class GroupUserComponent implements OnInit {
	public defaultHeaders: any = [];
	public data: any;
	public id: number;
	public users: User[];
	public headers: any = [];
	public loading: boolean = true;
	public loadingUsers: boolean = true;
	public ready: boolean = false;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add', permissions: ['group:adduser'] },
		{ title: 'Remove', action: 'remove', selectable: true, permissions: ['group:removeuser'] },
	];
	public defaultHeadersUsers: any = [];
	public headersUsers: any = [];
	public requestInProgress: boolean = false;
	@ViewChild('addModal') addModal: ModalComponent;
	@ViewChild('addUserGrid') addUserGrid: TableComponent;
	@ViewChild('userGrid') userGrid: TableComponent;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.defaultHeaders = ['username'];
		this.headers.push(
			{ field: 'userId', header: 'ID' },
			{ field: 'username', header: 'Name' },
			{ field: 'steamId', header: 'Steam ID' }
		);
		this.defaultHeadersUsers = ['username'];
		this.headersUsers.push({ field: 'username', header: 'Username' });
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadGroup();
		});
	}

	loadGroup() {
		this.loading = true;
		this.http.get('/Group/' + this.id, { withCredentials: true }).subscribe((group: Group) => {
			this.data = group.groupMembers;
			this.loading = false;
		});
	}

	loadUser() {
		this.loadingUsers = true;
		this.http.get('/Group/' + this.id + '/nonMember', { withCredentials: true }).subscribe((res: User[]) => {
			this.users = res;
			this.loadingUsers = false;
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.loadUser();
				this.addModal.open();
				break;
			case 'remove':
				this.removeMember();
				break;
		}
	}

	addMember() {
		if (this.addUserGrid?.selectedItems) {
			this.requestInProgress = true;
			this.http
				.post(
					'/Group/' + this.id + '/addUser/' + this.addUserGrid.selectedItems.userId,
					{},
					{ withCredentials: true }
				)
				.subscribe(() => {
					this.loadGroup();
					this.loadUser();
					this.requestInProgress = false;
				});
		}
	}

	removeMember() {
		this.requestInProgress = true;
		this.http
			.delete('/Group/' + this.id + '/removeUser/' + this.userGrid.selectedItems.userId, { withCredentials: true })
			.subscribe(() => {
				this.loadGroup();
				this.requestInProgress = false;
			});
	}
}
