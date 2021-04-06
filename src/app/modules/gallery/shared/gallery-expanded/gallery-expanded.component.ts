import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-gallery-expanded',
	templateUrl: './gallery-expanded.component.html',
	styleUrls: ['./gallery-expanded.component.scss'],
})
export class GalleryExpandedComponent implements OnInit {
	@Input() imgObj;
	public img: string;
	constructor() {}

	ngOnInit(): void {}
}
