import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscriber } from 'rxjs';
import { FormFieldModel } from 'src/app/core/models/form-field.model';

export interface FormSettings {
	readonly?: boolean;
	customSubmit?: boolean;
}

@Component({
	selector: 'tf47-form-new',
	templateUrl: './tf47-form-new.component.html',
	styleUrls: ['./tf47-form-new.component.scss'],
})
export class Tf47FormNewComponent implements OnInit {
	@Input() formSettings: FormSettings;
	@Input() formFields: Array<FormFieldModel>;
	public form: FormGroup;
	constructor() {}

	ngOnInit(): void {
		this.initForm();
	}

	private initForm() {
		this.createFormGroup().subscribe(() => {});
	}

	private createFormGroup(): Observable<void> {
		return new Observable((subscriber) => {
			this.form = new FormGroup({});
			for (const field of this.formFields) {
      	this.form.addControl(field.field, new FormControl(null, this.composeValidators(field)));
			}
		});
	}

  private composeValidators(field: FormFieldModel) {
    const validations = [];
    if (field.required) {
      validations.push(Validators.required);
    }
    if (field?.restrictions?.numberField?.min) {
      validations.push(Validators.min(field.restrictions.numberField.min));
    }
    if (field?.restrictions?.numberField?.max) {
      validations.push(Validators.max(field.restrictions.numberField.max));
    }
    if (field?.restrictions?.minLength) {
      validations.push(Validators.minLength(field.restrictions.minLength));
    }
    if (field?.restrictions?.maxLength) {
      validations.push(Validators.maxLength(field.restrictions.maxLength));
    }
    if (field?.restrictions?.pattern) {
      validations.push(Validators.pattern(field.restrictions.pattern));
    }
    return validations;
  }
}
