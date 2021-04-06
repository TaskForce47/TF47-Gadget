import { Component, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import navData from 'src/assets/navigation.json';
import { AuthService } from '../../services/auth.service';
@Component({
	selector: 'gadget-navigation',
	templateUrl: './gadget-navigation.component.html',
})
export class GadgetNavigationComponent implements OnInit {
	constructor(private auth: AuthService) {}
	public roles: Array<string>;
	public navdata = navData;
	@ViewChild('item') item;
	ngOnInit(): void {
		this.auth.details$.subscribe((res) => {
			this.roles = ['Admin'];
		});
	}

	public checkRoles(link) {
		return link.roles && link.roles.length > 0 && this.roles && this.roles.length > 0
			? this.roles.some((role) => link.roles.indexOf(role) >= 0)
			: true;
	}
}
