import { Component, OnInit } from '@angular/core';
import { Group } from '../../../../core/models/Gadget';
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
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
	templateUrl: './group-settings.component.html',
	styleUrls: ['./group-settings.component.scss'],
})
export class GroupSettingsComponent implements OnInit {
	public loading: boolean = true;
	public group: Group;
	public id: number;
	formModel: DynamicFormModel = [
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
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.formModel);
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadGroup();
		});
	}
	loadGroup() {
		this.loading = true;
		this.http.get('/Group/' + this.id, { withCredentials: true }).subscribe((res: Group) => {
			this.group = res;
			this.myFormGroup.patchValue({
				group: {
					name: this.group.name,
					description: this.group.description,
					backgroundColor: this.group.backgroundColor,
					textColor: this.group.textColor,
					isVisible: this.group.isVisible,
					permissions: this.group.permissions,
				},
			});
			this.loading = false;
		});
	}
	submit() {
		this.http
			.put('/Group/' + this.id, this.myFormGroup.getRawValue().group, { withCredentials: true })
			.subscribe(() => {
				this.loadGroup();
			});
	}
}
