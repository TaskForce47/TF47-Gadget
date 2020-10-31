import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-modal',
	templateUrl: './modal.component.html',
	styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
	public display: boolean = false;
	@Input() styleClass: Array<string>;
	constructor() {}

	ngOnInit(): void {}

	public open() {
		this.display = true;
	}

	public close() {
		this.display = false;
	}
}
