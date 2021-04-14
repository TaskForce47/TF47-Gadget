import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { BreadcrumbService } from '../../core/services/breadcrumb.service';

@Component({
	selector: 'app-breadcrumbs',
	templateUrl: './breadcrumbs.component.html',
})
export class BreadcrumbsComponent implements OnInit, OnChanges {
	@Input() prefix: string = '/';

	public _urls: string[];
	public _routerSubscription: any;

	constructor(private router: Router, private breadcrumbService: BreadcrumbService) {}

	ngOnInit(): void {
		this._urls = [];
		this._routerSubscription = this.router.events.subscribe((navigationEnd: NavigationEnd) => {
			if (navigationEnd instanceof NavigationEnd) {
				this._urls.length = 0; // Fastest way to clear out array
				this.generateBreadcrumbTrail(
					navigationEnd.urlAfterRedirects ? navigationEnd.urlAfterRedirects : navigationEnd.url
				);
			}
		});
	}

	ngOnChanges(changes: any): void {
		if (!this._urls) {
			return;
		}

		this._urls.length = 0;
		this.generateBreadcrumbTrail(this.router.url);
	}

	generateBreadcrumbTrail(url: string): void {
		if (!this.breadcrumbService.isRouteHidden(url)) {
			// Add url to beginning of array (since the url is being recursively broken down from full url to its parent)
			this._urls.unshift(url);
		}

		if (url.lastIndexOf('/') > 0) {
			this.generateBreadcrumbTrail(url.substr(0, url.lastIndexOf('/'))); // Find last '/' and add everything before it as a parent route
		} else if (this.prefix.length > 0) {
			this._urls.unshift(this.prefix);
		}
	}

	navigateTo(url: string): void {
		this.router.navigateByUrl(url);
	}

	friendlyName(url: string): string {
		return !url ? '' : this.breadcrumbService.getFriendlyNameForRoute(url);
	}

	ngOnDestroy(): void {
		this._routerSubscription.unsubscribe();
	}
}
