import { Component, OnInit, ViewChild } from '@angular/core';
// @ts-ignore
import navData from 'src/assets/navigation.json';
import { AuthService } from '../../core/services/auth.service';
import { PermissionService } from '../../core/services/permission.service';
@Component({
	selector: 'gadget-navigation',
	templateUrl: './gadget-navigation.component.html',
})
export class GadgetNavigationComponent implements OnInit {
	constructor(private auth: AuthService, private permissionsService: PermissionService) {}
	private navdata = navData;
	public links = [];
	@ViewChild('item') item;
	ngOnInit(): void {
		if (!this.auth.isCookieSet()) {
			this.links = this.navdata.links.filter((link) => link.permissions.length === 0);
		} else {
			this.links = this.navdata.links;
		}
	}

	public checkPermissions(link) {
		if (link.permissions.length === 0) return true;
		return link.permissions.every((permission) => this.permissionsService.hasPermission(permission));
	}
}
