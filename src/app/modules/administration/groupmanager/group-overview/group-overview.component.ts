import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import { HeaderButton } from '../../../../ui/table/table.component';
import {
	DynamicCheckboxModel,
	DynamicColorPickerModel,
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-group-overview',
	templateUrl: './group-overview.component.html',
	styleUrls: ['./group-overview.component.scss'],
})
export class GroupOverviewComponent implements OnInit {
	public defaultHeaders: any = [];
	public data: any;
	public headers: any = [];
	public loading: boolean = true;
	public ready: boolean = false;

	@ViewChild('addModal') addModal: ModalComponent;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add', permissions: ['group:create'] },
		{ title: 'View', action: 'view', selectable: true },
		{ title: 'Delete', action: 'delete', selectable: true, permissions: ['group:remove'] },
	];
	myFormModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'group',
			group: [
				new DynamicInputModel({
					id: 'name',
					label: 'Name',
					required: true,
				}),
				new DynamicTextAreaModel({
					id: 'description',
					label: 'Description',
					required: true,
				}),
				new DynamicCheckboxModel({
					id: 'isVisible',
					label: 'Visible',
					required: true,
					value: false,
				}),
				new DynamicColorPickerModel({
					id: 'textColor',
					label: 'Text Color',
					required: true,
					format: 'hex',
				}),
				new DynamicColorPickerModel({
					id: 'backgroundColor',
					label: 'Background Color',
					required: true,
					format: 'hex',
				}),
			],
		}),
	];
	myFormGroup: FormGroup;
	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: HttpClient,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'description'];
		this.headers.push(
			{ field: 'groupId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' }
		);
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
		this.loadGroups();
		this.ready = true;
	}

	loadGroups() {
		this.loading = true;
		this.http.get('/Group', { withCredentials: true }).subscribe((res) => {
			this.data = res;
			this.loading = false;
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.addModal.open();
				break;
			case 'delete':
				this.deleteGroup($event[2]);
				break;
			case 'view':
				this.router.navigate(['../', $event[2].groupId], { relativeTo: this.activatedRouter });
				break;
		}
	}

	deleteGroup(groupData: any) {
		this.http.delete('/group/' + groupData.groupId, { withCredentials: true }).subscribe(() => {
			this.loadGroups();
		});
	}

	submit() {
		this.http.post('/Group', this.myFormGroup.getRawValue().group, { withCredentials: true }).subscribe(() => {
			this.myFormGroup.reset();
			this.loadGroups();
			this.addModal.close();
		});
	}
}
