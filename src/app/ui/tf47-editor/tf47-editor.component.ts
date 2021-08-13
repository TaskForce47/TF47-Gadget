import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Editor } from 'ngx-editor';

@Component({
	selector: 'tf47-editor',
	templateUrl: './tf47-editor.component.html',
	styleUrls: ['./tf47-editor.component.scss'],
	encapsulation: ViewEncapsulation.ShadowDom,
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
