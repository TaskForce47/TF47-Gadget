import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { SlotGroup } from '../../core/models/Gadget';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'slot-group',
	templateUrl: './slot-group.component.html',
	styleUrls: ['./slot-group.component.scss'],
})
export class SlotGroupComponent implements OnInit {
	@Input() slotGroup: SlotGroup;
	@Output() addedSlot = new EventEmitter<void>();
	@Output() removedSlotGroup = new EventEmitter<void>();
	constructor(private http: HttpClient) {}

	ngOnInit(): void {}

	public addSlot(slotGroupId: number) {
		this.http
			.post(
				'/Slot',
				{
					slotGroupId,
					title: 'Rifleman',
					description: '',
					orderNumber: 0,
					difficulty: 0,
					reserve: false,
					blocked: false,
					requiredDLC: false,
				},
				{ withCredentials: true }
			)
			.subscribe((res) => {
				this.addedSlot.emit();
			});
	}

	removeSlotGroup() {
		this.http
			.delete(
				'/SlotGroup/' + this.slotGroup.slotGroupId,

				{ withCredentials: true }
			)
			.subscribe((res) => {
				this.removedSlotGroup.emit();
			});
	}

	addUser(slotId: any) {
		this.http
			.put(
				'/Slot/' + slotId + '/addUser',
				{
					userId: 'f704093b-59b5-4df4-8cf7-f6e17555dc7b',
				},
				{ withCredentials: true }
			)
			.subscribe((res) => {
				this.addedSlot.emit();
			});
	}

	editSlot(slotId: any) {}

	removeSlot(slotId: any) {
		this.http
			.delete(
				'/Slot/' + slotId,

				{ withCredentials: true }
			)
			.subscribe((res) => {
				this.removedSlotGroup.emit();
			});
	}

	editSlotGroup() {}
}
