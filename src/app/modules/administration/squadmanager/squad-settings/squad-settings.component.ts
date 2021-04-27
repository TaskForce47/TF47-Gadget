import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { DynamicFormGroupModel, DynamicFormModel, DynamicFormService, DynamicInputModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { Squad } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './squad-settings.component.html',
	styleUrls: ['./squad-settings.component.scss'],
})
export class SquadSettingsComponent implements OnInit {
	public loading: boolean = true;
	public squad: Squad;
	public id: number;
	myFormModel: DynamicFormModel = [
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
	public myFormGroup: FormGroup;
	public rebuildInProgress: boolean = false;
	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private formService: DynamicFormService
	) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadSquad();
		});
	}
	loadSquad() {
		this.loading = true;
		this.http.get('/Squad/' + this.id, { withCredentials: true }).subscribe((res: Squad) => {
			this.squad = res;
			this.myFormGroup.patchValue({
				squad: {
					name: this.squad.name,
					title: this.squad.title,
					mail: this.squad.mail,
					website: this.squad.website,
					nick: this.squad.nick,
				},
			});
			this.loading = false;
		});
	}
	submit() {
		this.http
			.put('/Squad/' + this.id, this.myFormGroup.getRawValue().squad, { withCredentials: true })
			.subscribe((res) => {
				this.loadSquad();
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
}
