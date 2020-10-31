import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'mega-menu',
	templateUrl: './mega-menu.component.html',
})
export class MegaMenuComponent implements OnInit {
	constructor() {}
	@Input() items;
	@Input() orientation;
	ngOnInit(): void {}
}
