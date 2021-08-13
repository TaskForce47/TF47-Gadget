import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Slot, SlotGroup } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-event-slotting',
	templateUrl: './event-slotting.component.html',
	styleUrls: ['./event-slotting.component.scss'],
})
export class EventSlottingComponent implements OnInit {
	public id: number;
	public slotGroups: SlotGroup[] = [];
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadSlotGroups();
		});
	}

	public loadSlotGroups() {
		this.http.get('/Mission/' + this.id + '/slotting', { withCredentials: true }).subscribe((res: SlotGroup[]) => {
			this.slotGroups = res;
		});
	}

	public addGroup() {
		this.http
			.post(
				'/SlotGroup',
				{
					missionId: this.id,
					title: 'Fireteam',
					description: '',
				},
				{ withCredentials: true }
			)
			.subscribe((res) => {
				this.loadSlotGroups();
			});
	}
}
