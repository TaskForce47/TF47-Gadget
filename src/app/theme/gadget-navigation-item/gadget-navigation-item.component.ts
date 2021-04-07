import { Component, Input, OnInit } from '@angular/core';
import { PermissionService } from '../../core/services/permission.service';

@Component({
	selector: 'gadget-navigation-item',
	templateUrl: './gadget-navigation-item.component.html',
})
export class GadgetNavigationItemComponent implements OnInit {
	constructor(private permissionsService: PermissionService) {}
	@Input() data;
	ngOnInit(): void {}

	public checkPermissions(link) {
		if (link.permissions.length === 0) return true;
		return link.permissions.every((permission) => this.permissionsService.hasPermission(permission));
	}
}
