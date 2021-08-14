import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormFieldModel } from 'src/app/core/models/form-field.model';



export interface FormSettings {
  readonly?: boolean;
  customSubmit?: boolean;
}

@Component({
  selector: 'tf47-form-new',
  templateUrl: './tf47-form-new.component.html',
  styleUrls: ['./tf47-form-new.component.scss']
})
export class Tf47FormNewComponent implements OnInit {
  @Input() formSettings: FormSettings;
  @Input() formFields: Array<FormFieldModel>;

  public form: FormGroup;
  public formReady: boolean = false;
  constructor() { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.createFormGroup();
    this.formReady = true;
  }

  private createFormGroup() {
    let group = {}
    this.formFields.forEach(formField => {
      group[formField.information.name] = new FormControl('');
    })
    this.form = new FormGroup(group);
  }

}
