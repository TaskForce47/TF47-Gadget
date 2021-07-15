import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { HeaderButton, TableComponent } from '../../../../ui/table/table.component';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import {
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { Squad, SquadMember, User } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './squad-profile.component.html',
	styleUrls: ['./squad-profile.component.scss'],
})
export class SquadProfileComponent implements OnInit {
	public loading: boolean = true;
	public loadingUsers: boolean = true;
	public squad: Squad;
	public users: User[];
	public id: number;
	public defaultHeaders: any = [];
	public defaultHeadersUsers: any = [];
	public headers: any = [];
	public headersUsers: any = [];
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'Edit', action: 'edit', selectable: true },
		{ title: 'Remove', action: 'remove', selectable: true },
	];
	public requestInProgress: boolean = false;
	public editFormReady: boolean = false;
	@ViewChild('addModal') addModal: ModalComponent;
	@ViewChild('editModal') editModal: ModalComponent;
	@ViewChild('addUserGrid') addUserGrid: TableComponent;
	@ViewChild('userGrid') userGrid: TableComponent;
	formModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'member',
			group: [
				new DynamicInputModel({
					id: 'mail',
					label: 'Email',
					required: true,
				}),
				new DynamicTextAreaModel({
					id: 'remark',
					label: 'Remark',
					required: true,
				}),
			],
		}),
	];
	myFormGroup: FormGroup;
	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.formModel);
		this.defaultHeaders = ['username', 'steamId', 'remark'];
		this.headers.push(
			{ field: 'squadMemberId', header: 'ID' },
			{ field: 'userId', header: 'User ID' },
			{ field: 'steamId', header: 'Steam ID' },
			{ field: 'username', header: 'Name' },
			{ field: 'mail', header: 'Email' },
			{ field: 'remark', header: 'Remark' }
		);
		this.defaultHeadersUsers = ['username'];
		this.headersUsers.push({ field: 'username', header: 'Username' });
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadSquad();
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.loadUser();
				this.addModal.open();
				break;
			case 'edit':
				this.myFormGroup.patchValue({
					member: {
						mail: $event[2].mail,
						remark: $event[2].remark,
					},
				});
				this.editFormReady = true;
				this.editModal.open();
				break;
			case 'remove':
				this.removeMember($event[2]);
				break;
		}
	}

	loadSquad() {
		this.loading = true;
		this.http.get('/Squad/' + this.id, { withCredentials: true }).subscribe((res: Squad) => {
			this.squad = res;
			this.loading = false;
		});
	}

	addMember() {
		if (this.addUserGrid?.selectedItems) {
			this.requestInProgress = true;
			const payload = {
				squadId: this.id,
				remark: '',
				mail: this.squad.mail,
				userId: this.addUserGrid.selectedItems.userId,
			};
			this.http.post('/SquadMember', payload, { withCredentials: true }).subscribe(() => {
				this.loadSquad();
				this.loadUser();
				this.requestInProgress = false;
			});
		}
	}

	removeMember(squadMember: SquadMember) {
		this.requestInProgress = true;
		this.http.delete('/SquadMember/' + squadMember.squadMemberId, { withCredentials: true }).subscribe((res) => {
			this.loadSquad();
			this.requestInProgress = false;
		});
	}

	loadUser() {
		this.loadingUsers = true;
		this.http.get('/Squad/' + this.id + '/nonMember', { withCredentials: true }).subscribe((res: User[]) => {
			this.users = res;
			this.loadingUsers = false;
		});
	}

	editMember() {
		this.requestInProgress = true;
		const payload = {
			remark: this.myFormGroup.getRawValue().member.remark,
			mail: this.squad.mail,
		};
		this.http
			.put('/SquadMember/' + this.userGrid.selectedItems.squadMemberId, payload, { withCredentials: true })
			.subscribe(() => {
				this.editModal.close();
				this.loadSquad();
				this.requestInProgress = false;
			});
	}
}
