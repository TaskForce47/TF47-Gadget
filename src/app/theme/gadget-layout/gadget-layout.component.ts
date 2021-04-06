import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-gadget-layout',
	templateUrl: './gadget-layout.component.html',
})
export class GadgetLayoutComponent implements OnInit {
	constructor(private auth: AuthService, private eRef: ElementRef) {}
	public user;
	public toggleMenu: boolean = false;
	public items: MenuItem[];

	ngOnInit(): void {
		this.auth.details$.subscribe((res) => {
			this.user = res;
			this.items = [
				{ label: 'Profile', icon: 'mdi mdi-account', routerLink: 'account/profile' },
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

	openPage(page: string) {
		window.open(page);
	}
}
