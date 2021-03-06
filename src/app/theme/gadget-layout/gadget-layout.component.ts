import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-gadget-layout',
	templateUrl: './gadget-layout.component.html',
})
export class GadgetLayoutComponent implements OnInit {
	constructor(public auth: AuthService) {}
	public user;
	public toggleMenu: boolean = false;
	public items: MenuItem[];

	ngOnInit(): void {
		this.auth.details$.subscribe((res) => {
			this.user = res;
			this.items = [
				{ label: 'Profile', icon: 'mdi mdi-account', routerLink: 'account/profile' },
				{ label: 'Api Keys', icon: 'mdi mdi-account-key', routerLink: 'account/keys' },
				{ label: 'Settings', icon: 'mdi mdi-wrench', routerLink: 'account/settings' },
				{
					label: 'Logout',
					icon: 'mdi mdi-logout',
					command: () => {
						this.auth.logout();
					},
				},
			];
		});
	}
	@ViewChild('navigation') navigation: ElementRef;
	@HostListener('document:click', ['$event'])
	clickout(event) {
		if (this.toggleMenu === true && !this.navigation.nativeElement.contains(event.target)) {
			this.toggleMenu = false;
		}
	}

	public menuToggle(event: MouseEvent) {
		this.toggleMenu = !this.toggleMenu;
		event.stopPropagation();
	}
}
