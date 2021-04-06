import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
	selector: 'gadget-navigation-item',
	templateUrl: './gadget-navigation-item.component.html',
})
export class GadgetNavigationItemComponent implements OnInit {
	constructor(private auth: AuthService) {}
	@Input() data;
	public roles: Array<string>;
	public checkRoles(link) {
		return link.roles && link.roles.length > 0 ? this.roles.some((role) => link.roles.indexOf(role) >= 0) : true;
	}
	ngOnInit(): void {
		this.auth.details$.subscribe((res) => {
			this.roles = ['Admin'];
		});
	}
}
