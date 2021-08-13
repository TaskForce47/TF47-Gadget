import { Component, OnInit } from '@angular/core';
import eventProfileForm from '../../../../core/forms/event-profile';
import { FormSettings } from '../../../../ui/tf47-form/tf47-form.component';

@Component({
	selector: 'app-event-profile',
	templateUrl: './event-profile.component.html',
	styleUrls: ['./event-profile.component.scss'],
})
export class EventProfileComponent implements OnInit {
	public fields = eventProfileForm;
	public formSettings: FormSettings = {
		readonly: true,
	};
	constructor() {}

	ngOnInit(): void {}
}
