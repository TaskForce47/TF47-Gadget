import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { DateService } from '../../../../core/services/date.service';

@Component({
	selector: 'app-gallery-expanded',
	templateUrl: './gallery-expanded.component.html',
	styleUrls: ['./gallery-expanded.component.scss'],
})
export class GalleryExpandedComponent implements OnInit {
	@Input() imgObj;
	@Output() chevronClicked: EventEmitter<string> = new EventEmitter();
	public img: string;
	constructor(public dateService: DateService) {}

	ngOnInit(): void {}
}
