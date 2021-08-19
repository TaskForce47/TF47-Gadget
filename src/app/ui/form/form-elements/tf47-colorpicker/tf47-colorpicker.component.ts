import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
	selector: 'tf47-colorpicker',
	templateUrl: './tf47-colorpicker.component.html',
	styleUrls: ['./tf47-colorpicker.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			multi: true,
			useExisting: forwardRef(() => Tf47ColorpickerComponent),
		},
	],
})
export class Tf47ColorpickerComponent implements ControlValueAccessor {
	value = null;

	@Input() field;

	public touched = false;

	public disabled = false;

	onChange = (value) => {
		this.value = value;
	};

	onTouched = () => {};

	writeValue(value: string) {
		this.value = value;
	}

	registerOnChange(onChange: any) {
		this.onChange = onChange;
	}

	registerOnTouched(onTouched: any) {
		this.onTouched = onTouched;
	}

	markAsTouched() {
		if (!this.touched) {
			this.onTouched();
			this.touched = true;
		}
	}

	setDisabledState(disabled: boolean) {
		this.disabled = disabled;
	}
}
