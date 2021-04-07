import { Component, OnInit } from '@angular/core';
import {
	DynamicCheckboxModel,
	DynamicFormControlEvent,
	DynamicFormModel,
	DynamicFormService,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-live-map',
	templateUrl: './live-map.component.html',
	styleUrls: ['./live-map.component.scss'],
})
export class LiveMapComponent implements OnInit {
	myFormModel: DynamicFormModel = [
		new DynamicCheckboxModel({
			id: 'grid',
			label: 'Show Grid',
		}),
		new DynamicCheckboxModel({
			id: 'satmap',
			label: 'Show Satellite Map',
		}),
	];
	myFormGroup: FormGroup;
	public sat: boolean = false;
	public grid: boolean = false;
	constructor(private formService: DynamicFormService) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
	}

	update($event: DynamicFormControlEvent) {
		if ($event.model.id === 'satmap') {
			this.sat = !this.sat;
		} else if ($event.model.id === 'grid') {
			this.grid = !this.grid;
		}
	}
}
