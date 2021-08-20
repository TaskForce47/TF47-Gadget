import {
	AfterViewInit,
	Component,
	ElementRef,
	HostListener,
	Input,
	OnInit,
	QueryList,
	Renderer2,
	ViewChild,
	ViewChildren,
} from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { NgxMasonryComponent, NgxMasonryDirective } from 'ngx-masonry';
import { forkJoin, Observable, of, Subscriber } from 'rxjs';
import { FormFieldModel } from 'src/app/core/models/form-field.model';
import { FormFieldSetModel } from 'src/app/core/models/form-fieldset.model';

class FormHook {
	execute(form: Tf47FormNewComponent): Observable<FormFieldModel> {
		return of();
	}
}
interface HookTypes {
	initFormHooks?: FormHook[];
	initModelHooks?: FormHook[];
}
export interface FormSettingsNew {
	readonly?: boolean;
	customSubmit?: boolean;
	hooks?: HookTypes;
}

@Component({
	selector: 'tf47-form-new',
	templateUrl: './tf47-form-new.component.html',
	styleUrls: ['./tf47-form-new.component.scss'],
})
export class Tf47FormNewComponent implements OnInit, AfterViewInit {
	@Input() formSettings: FormSettingsNew;
	@Input() formFieldGroups: Array<Array<FormFieldSetModel>>;
	@ViewChild('formEl') formEl: ElementRef;
	@ViewChildren(NgxMasonryComponent) masonry: QueryList<NgxMasonryComponent>;
	@ViewChildren(NgxMasonryDirective) masonryBricks: QueryList<NgxMasonryDirective>;
	@HostListener('window:resize')
	public detectResize(): void {
    if(this.formReady){
      this.recalcMasonry();
    }
	}
	public formFieldMap: Map<string, FormFieldModel> = new Map();
	public form: FormGroup;
	public formReady = false;
	public masonryOptions = {
		columnWidth: 350,
		gutter: 32
	};
	constructor(private renderer: Renderer2) {}

	ngOnInit(): void {
		this.initForm().subscribe(() => {
			this.formReady = true;
		});
	}
	ngAfterViewInit() {
		this.recalcMasonry();
	}

	private initForm() {
		return new Observable((subscriber) => {
			this.createFormFieldList();
			this.createFormGroup().subscribe(() => {
				if (this.formSettings?.hooks?.initFormHooks) {
					this.excecuteHooks(this.formSettings.hooks.initFormHooks).subscribe(() => {
						subscriber.next();
						subscriber.complete();
					});
				} else {
					subscriber.next();
					subscriber.complete();
				}
			});
		});
	}

	private createFormFieldList() {
		const flatFields = this.formFieldGroups
			.reduce((acc, val) => acc.concat(val), [])
			.map((formFieldGroup) => formFieldGroup.fields)
			.reduce((acc, val) => acc.concat(val), []);
		for (let field of flatFields) {
			this.formFieldMap.set(field.field, field);
		}
	}

	private createFormGroup(): Observable<void> {
		return new Observable((subscriber) => {
			this.form = new FormGroup({});
			for (const field of this.formFieldMap.values()) {
				this.form.addControl(field.field, new FormControl(null, this.composeValidators(field)));
			}
			subscriber.next();
			subscriber.complete();
		});
	}

	private composeValidators(field: FormFieldModel): Array<ValidatorFn> {
		const validators = [];
		if (field.required) {
			validators.push(Validators.required);
		}
		if (field?.restrictions === undefined) return validators;
		for (const attr in field.restrictions) {
			if (!Validators.hasOwnProperty(attr)) continue;
			validators.push(Validators[attr](field.restrictions[attr]));
		}
		return validators;
	}

	private excecuteHooks(hooks: FormHook[]) {
		return new Observable((subscriber) => {
			const hookObs = [];
			for (let hook of hooks) {
				hookObs.push(hook.execute(this));
			}
			forkJoin(hookObs).subscribe((changedFields: FormFieldModel[]) => {
				for (let changedField of changedFields) {
					this.formFieldMap[changedField.field] = changedField;
				}
				subscriber.next();
				subscriber.complete();
			});
		});
	}

	private recalcMasonry() {
		const width = Math.max(
			350,
			(this.formEl.nativeElement as HTMLElement).offsetWidth /
				this.formFieldGroups.reduce((acc, val) => acc.concat(val), []).length -
				32
		);
		this.masonryOptions.columnWidth = width*2;
		for (let brick of this.masonryBricks) {
			this.renderer.setStyle(brick.element.nativeElement, 'width', `${width}px`);
		}

    for(let mason of this.masonry) {
      mason.reloadItems();
      mason.layout();
    }
	}
}
