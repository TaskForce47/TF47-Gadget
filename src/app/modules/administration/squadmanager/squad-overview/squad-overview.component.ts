import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderButton } from '../../../../ui/table/table.component';
import { ModalComponent } from 'src/app/ui/modal/modal.component';
import {
	DynamicFormGroupModel,
	DynamicFormLayout,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
	templateUrl: './squad-overview.component.html',
	styleUrls: ['./squad-overview.component.scss'],
})
export class SquadOverviewComponent implements OnInit {
	public defaultHeaders: any = [];
	public data: any;
	public headers: any = [];
	public loading: boolean = true;
	public ready: boolean = false;

	@ViewChild('addModal') addModal: ModalComponent;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'View', action: 'view', selectable: true },
		{ title: 'Delete', action: 'delete', selectable: true },
	];
	formModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'squad',
			group: [
				new DynamicInputModel({
					id: 'name',
					label: 'Name',
					required: true,
				}),
				new DynamicInputModel({
					id: 'title',
					label: 'Title',
					required: true,
				}),
				new DynamicInputModel({
					id: 'nick',
					label: 'Nick',
					required: true,
				}),
				new DynamicInputModel({
					id: 'website',
					label: 'Website',
					required: true,
				}),
				new DynamicInputModel({
					id: 'mail',
					label: 'Email',
					required: true,
				}),
			],
		}),
	];
	public formlayout: DynamicFormLayout = {
		test1: {
			grid: {
				container: 'p-col-3',
			},
		},

		test2: {
			grid: {
				container: 'p-col-3',
			},
		},
	};
	myFormGroup: FormGroup;
	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: HttpClient,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'nick', 'website'];
		this.headers.push(
			{ field: 'squadId', header: 'ID' },
			{ field: 'email', header: 'Email' },
			{ field: 'name', header: 'Name' },
			{ field: 'nick', header: 'Nick' },
			{ field: 'website', header: 'Web' }
		);
		this.myFormGroup = this.formService.createFormGroup(this.formModel);
		this.loadSquads();
		this.ready = true;
	}

	loadSquads() {
		this.loading = true;
		this.http.get('/Squad', { withCredentials: true }).subscribe((res) => {
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
				this.deleteSquad($event[2]);
				break;
			case 'view':
				this.router.navigate(['../', $event[2].squadId], { relativeTo: this.activatedRouter });
				break;
		}
	}

	deleteSquad(squadData: any) {
		this.http.delete('/Squad/' + squadData.squadId, { withCredentials: true }).subscribe((res) => {
			this.loadSquads();
		});
	}

	submit() {
		this.http.post('/Squad', this.myFormGroup.getRawValue().squad, { withCredentials: true }).subscribe((res) => {
			this.loadSquads();
			this.addModal.close();
		});
	}
}
