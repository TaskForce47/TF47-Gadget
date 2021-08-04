import { Component, OnDestroy, OnInit } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
	selector: 'tf47-editor',
	templateUrl: './tf47-editor.component.html',
	styleUrls: ['./tf47-editor.component.scss'],
})
export class Tf47EditorComponent implements OnInit, OnDestroy {
	html = '';
	editor: Editor;

	constructor() {}
	ngOnInit(): void {
		this.editor = new Editor();
	}

	ngOnDestroy(): void {
		this.editor.destroy();
	}
}
