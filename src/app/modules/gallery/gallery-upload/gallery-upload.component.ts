import { Component, OnInit } from '@angular/core';
import {
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-gallery-upload',
	templateUrl: './gallery-upload.component.html',
	styleUrls: ['./gallery-upload.component.scss'],
})
export class GalleryUploadComponent implements OnInit {
	formModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'galleryImage',
			group: [
				new DynamicInputModel({
					id: 'name',
					label: 'Name',
					required: true,
				}),
				new DynamicTextAreaModel({
					id: 'description',
					label: 'Description',
					required: true,
				}),
			],
		}),
	];
	myFormGroup: FormGroup;
	public fileDisplay = null;
	public file = null;
	constructor(private formService: DynamicFormService, private http: HttpClient) {}

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.formModel);
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
			this.fileDisplay = reader.result;
		};
		this.file = files[0];
	}

	public reset() {
		this.fileDisplay = null;
		this.file = null;
		this.myFormGroup.reset();
	}

	public submit() {
		const formData = new FormData();
		formData.set('file', this.file);
		formData.set('name', this.myFormGroup.getRawValue().galleryImage.name);
		formData.set('description', this.myFormGroup.getRawValue().galleryImage.description);
		this.http.put('/Gallery/' + 1 + '/uploadImage', formData, { withCredentials: true }).subscribe(() => {
			this.reset();
		});
	}
}
