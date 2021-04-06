import { Component, OnInit } from '@angular/core';
import { DynamicFormModel, DynamicFormService, DynamicInputModel, DynamicSelectModel } from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-gallery-upload',
	templateUrl: './gallery-upload.component.html',
	styleUrls: ['./gallery-upload.component.scss'],
})
export class GalleryUploadComponent implements OnInit {
	myFormModel: DynamicFormModel = [
		new DynamicInputModel({
			id: 'name',
			label: 'Name',
			required: true,
		}),
		new DynamicSelectModel({
			id: 'collection',
			label: 'Collection',
			multiple: true,
			options: [
				{
					label: 'Option 1',
					value: 'option-1',
				},
				{
					label: 'Option 2',
					value: 'option-2',
				},
				{
					label: 'Option 3',
					value: 'option-3',
				},
			],
		}),
	];
	myFormGroup: FormGroup;
	file = null;
	constructor(private formService: DynamicFormService) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
	}

	onFileChanged(event) {
		const files = event.target.files;
		if (files.length === 0) return;

		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.file = reader.result;
		};
	}

	reset() {
		this.file = null;
	}
}
