import { Component, OnInit } from '@angular/core';
import eventAddForm from '../../../../core/forms/event-add';

@Component({
	selector: 'app-event-add',
	templateUrl: './event-add.component.html',
	styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
	public formFields = eventAddForm;
	constructor() {}

	ngOnInit(): void {}
}
