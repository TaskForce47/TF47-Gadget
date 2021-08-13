import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicFormModel, DynamicFormService } from '@ng-dynamic-forms/core';

export interface FormSettings {
	readonly?: boolean;
	customSubmit?: boolean;
}

@Component({
	selector: 'tf47-form',
	templateUrl: './tf47-form.component.html',
	styleUrls: ['./tf47-form.component.scss'],
})
export class Tf47FormComponent implements OnInit {
	@Input() fields;
	@Input() model;
	@Input() formSettings: FormSettings;
	@Output() formReady = new EventEmitter<void>();
	@Output() submit = new EventEmitter<object>();
	public formGroup: FormGroup;
	public formModel: DynamicFormModel;
	public ready: boolean = false;

	constructor(private formService: DynamicFormService) {}

	ngOnInit(): void {
		this.initForm();
		this.populateForm();
		this.ready = true;
		this.formReady.emit();
	}

	private initForm() {
		this.formModel = this.formService.fromJSON(this.fields);
		this.formGroup = this.formService.createFormGroup(this.formModel);
	}

	private populateForm() {
		this.formGroup.patchValue(this.model);
	}

	submitForm() {
		this.submit.emit(this.formGroup.getRawValue().group);
	}
}
