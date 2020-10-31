import { Component, OnInit } from '@angular/core';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { FormGroup } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
	selector: 'app-account-settings',
	templateUrl: './account-settings.component.html',
	styleUrls: ['./account-settings.component.scss'],
})
export class AccountSettingsComponent implements OnInit {
	public form = new FormGroup({});
	public model = {};
	public fields: FormlyFieldConfig[] = [
		{
			key: 'playerUid',
			type: 'input',
			templateOptions: {
				label: 'Player Uid',
				required: true,
				minLength: 17,
				maxLength: 17,
				type: 'string',
			},
			validators: {
				playerUid: {
					expression: (c) => !c.value || /^[0-9]*$/.test(c.value),
					message: (error, field: FormlyFieldConfig) => `Field should only consist of numbers`,
				},
			},
		},
	];

	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	submit() {
		if (this.form.valid) {
			const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
			this.http.put('/user/setUserPlayerUid', JSON.stringify(this.model), { headers }).subscribe((res) => {
				console.log(res);
			});
		}
	}
}
