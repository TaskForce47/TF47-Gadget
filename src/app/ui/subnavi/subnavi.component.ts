import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { NavigationEnd, Router } from '@angular/router';

@Component({
	selector: 'app-subnavi',
	templateUrl: './subnavi.component.html',
	styleUrls: ['./subnavi.component.scss'],
})
export class SubnaviComponent implements OnInit, OnDestroy {
	@Input() subnaviItems: MenuItem[];
	public activeItem: MenuItem;
	public _routerSubscription: any;
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.subnaviItems.forEach((item) => {
			this.checkActiveState(item);
		});
		this._routerSubscription = this.router.events.subscribe((navigationEnd: NavigationEnd) => {
			if (navigationEnd instanceof NavigationEnd) {
				this.subnaviItems.forEach((item) => {
					this.checkActiveState(item);
				});
			}
		});
	}

	ngOnDestroy(): void {
		this._routerSubscription.unsubscribe();
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
