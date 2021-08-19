import { Component, Input, OnInit } from '@angular/core';
import { FormFieldModel } from '../../../core/models/form-field.model';
import { ControlContainer, FormControl, FormGroupDirective } from '@angular/forms';

@Component({
	selector: 'form-element-wrapper',
	templateUrl: './form-element-wrapper.component.html',
	styleUrls: ['./form-element-wrapper.component.scss'],
	viewProviders: [{ provide: ControlContainer, useExisting: FormGroupDirective }],
})
export class FormElementWrapperComponent implements OnInit {
	formControl: FormControl;
	@Input() field: FormFieldModel;
	@Input()
	set controlName(value) {
		this.formControl = this.parentF.form.get(value) as FormControl;
	}
	constructor(private parentF: FormGroupDirective) {}

	ngOnInit(): void {}
}
