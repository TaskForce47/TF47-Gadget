import { Input, Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective } from '@angular/forms';
@Component({
	template: ``,
})
export class BasicFormElement implements OnInit {
	constructor(private parentF: FormGroupDirective) {}
	@Input() field;

	ngOnInit() {
		this.formControl = this.parentF.form.get(this.field.field) as FormControl;
	}
	public value = null;
	public formControl: FormControl;
	public disabled = false;
}
