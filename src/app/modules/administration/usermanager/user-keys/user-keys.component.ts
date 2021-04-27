import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../core/models/Gadget';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../core/services/auth.service';
import { HeaderButton, TableComponent } from '../../../../ui/table/table.component';
import {
	DynamicDatePickerModel,
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from '../../../../ui/modal/modal.component';

@Component({
	templateUrl: './user-keys.component.html',
	styleUrls: ['./user-keys.component.scss'],
})
export class UserKeysComponent implements OnInit {
	@ViewChild('apiKeyGrid') apiKeyGrid: TableComponent;
	@ViewChild('addModal') addModal: ModalComponent;
	public defaultHeaders: any = ['description', 'timeCreated', 'timeValidUntil', 'apiKey'];
	public headers: any = [
		{ field: 'apiKeyId', header: 'ID' },
		{ field: 'description', header: 'Description' },
		{ field: 'timeCreated', header: 'Created At' },
		{ field: 'timeValidUntil', header: 'Valid until' },
		{ field: 'apiKey', header: 'Key' },
	];
	public headerButtonActions: HeaderButton[] = [
		{ title: 'Add', action: 'add', permissions: ['apikey:create'] },
		{ title: 'Edit', action: 'edit', selectable: true, permissions: ['apikey:update'] },
		{ title: 'Delete', action: 'delete', selectable: true, permissions: ['apikey:remove'] },
	];
	public keys: any = [];
	public loadingKeys: boolean = true;
	public user: User;
	public ready: boolean = false;
	myFormModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'apikey',
			group: [
				new DynamicTextAreaModel({
					id: 'description',
					label: 'Description',
					required: true,
				}),
				new DynamicDatePickerModel({
					id: 'validUntil',
					label: 'Valid Until',
					required: true,
				}),
			],
		}),
	];
	myFormGroup: FormGroup;
	constructor(private http: HttpClient, private auth: AuthService, private formService: DynamicFormService) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
		this.auth.details$.subscribe((user) => {
			this.user = user;
			this.loadKeys();
			this.ready = true;
		});
	}

	public loadKeys() {
		this.loadingKeys = true;
		this.http.get('/ApiKey/user/' + this.user.userId, { withCredentials: true }).subscribe((res) => {
			this.keys = res;
			this.loadingKeys = false;
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.addModal.open();
				break;
			case 'edit':
				break;
			case 'delete':
				this.http
					.delete('/ApiKey/' + this.apiKeyGrid.selectedItems.apiKeyId, { withCredentials: true })
					.subscribe(() => {
						this.loadKeys();
					});
				break;
		}
	}

	addApiKey() {}
}
