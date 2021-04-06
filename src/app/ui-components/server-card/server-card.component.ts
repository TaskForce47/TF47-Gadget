import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'server-card',
	templateUrl: './server-card.component.html',
	styleUrls: ['./server-card.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class ServerCardComponent implements OnInit {
	@Input() server;
	constructor() {}

	ngOnInit(): void {}
}
