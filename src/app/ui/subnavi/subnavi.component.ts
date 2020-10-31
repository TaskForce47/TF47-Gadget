import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
	selector: 'app-subnavi',
	templateUrl: './subnavi.component.html',
	styleUrls: ['./subnavi.component.scss'],
})
export class SubnaviComponent implements OnInit {
	@Input() subnaviItems: MenuItem[];
	public activeItem: MenuItem;
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.subnaviItems.forEach((item) => {
			this.checkActiveState(item);
		});
	}

	checkActiveState(tab) {
		if (Array.isArray(tab.routerLink)) {
			if (this.router.url.indexOf(tab.routerLink[1]) !== -1) {
				this.activeItem = tab;
			}
		} else {
			if (this.router.url.indexOf(tab.routerLink) !== -1) {
				this.activeItem = tab;
			}
		}
	}
}
