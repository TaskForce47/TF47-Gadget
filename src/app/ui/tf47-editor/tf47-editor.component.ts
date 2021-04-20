import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'tf47-editor',
	templateUrl: './tf47-editor.component.html',
	styleUrls: ['./tf47-editor.component.scss'],
})
export class Tf47EditorComponent implements OnInit {
	editorModel: any;
	height: string = '320px';

	constructor() {}

	ngOnInit(): void {}
}
