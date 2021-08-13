import { Component, OnInit } from '@angular/core';
import eventAddForm from '../../../../core/forms/event-add';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-event-add',
	templateUrl: './event-add.component.html',
	styleUrls: ['./event-add.component.scss'],
})
export class EventAddComponent implements OnInit {
	public formFields = eventAddForm;
	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	public addEvent($event: Mission) {
		const payload = {
			name: $event.name,
			description: $event.descriptionShort,
			missionType: $event.missionType,
			campaignId: 1,
		};
		this.http.post('/Mission', payload, { withCredentials: true }).subscribe((res) => {});
	}
}
