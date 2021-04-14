import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
	selector: 'tf47-data-view',
	templateUrl: './tf47-data-view.component.html',
	styleUrls: ['./tf47-data-view.component.scss'],
})
export class Tf47DataViewComponent implements OnInit {
	constructor() {}
	@ViewChild('searchContainer', { static: true }) searchContainer: ElementRef;
	public searchHeight: number;
	public searchWidth: string;
	public rows = [];
	public rowsFiltered = [];
	public searchValue: any;
	ngOnInit(): void {
		this.calcDimensions();
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.calcDimensions();
	}

	private calcDimensions() {
		if (window.innerWidth > 991) {
			this.searchWidth = '250px';
			this.searchHeight = this.searchContainer.nativeElement.getBoundingClientRect().height - 120;
		} else {
			this.searchWidth = '100%';
			this.searchHeight = 250;
		}
	}

	public filter() {
		const filter = this.searchValue.toLowerCase();
		this.rowsFiltered = this.rows.filter((m: { name: string }) => m.name.toLowerCase().includes(filter));
	}
}
