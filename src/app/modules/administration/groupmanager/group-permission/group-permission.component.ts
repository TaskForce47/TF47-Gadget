import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Group, Permission } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './group-permission.component.html',
	styleUrls: ['./group-permission.component.scss'],
})
export class GroupPermissionComponent implements OnInit {
	public existingPermissions: string[] = [];
	public existingPermissionsRaw: Permission[] = [];
	public assignedPermissions: string[] = [];
	public notAssignedPermissions: string[] = [];
	public permissionMap: Map<string, { inherit: boolean; assigned: boolean }> = new Map();
	public id: number;
	public loading: boolean = true;
	public group: Group;
	public requestInProgress = false;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadData();
		});
	}

	public loadData() {
		this.loading = true;
		this.http.get('/Group/' + this.id, { withCredentials: true }).subscribe((group: Group) => {
			this.group = group;
			this.http.get('/Permission').subscribe((permissions: Permission[]) => {
				this.existingPermissionsRaw = permissions;
				this.existingPermissions = permissions.map((permission) => permission.name);
				this.assignedPermissions = group.permissions.map((permission) => permission.name);
				this.notAssignedPermissions = permissions
					.filter((permission) => !this.assignedPermissions.includes(permission.name))
					.map((permission) => permission.name);
				this.existingPermissions.forEach((permission) => {
					this.permissionMap.set(permission, {
						inherit: this.notAssignedPermissions.includes(permission),
						assigned: this.assignedPermissions.includes(permission),
					});
				});
				this.loading = false;
			});
		});
	}
	update(key: string, type: string) {
		if (type === 'assigned') {
			this.permissionMap.get(key).inherit = false;
			this.addPermission(key);
		}
		if (type === 'inherit') {
			this.permissionMap.get(key).assigned = false;
			this.removePermission(key);
		}
	}

	public addPermission(name) {
		this.requestInProgress = true;
		this.http
			.put(
				'/Group/' + this.id + '/addPermission/' + this.getPermisionId(name).permissionId,
				{},
				{ withCredentials: true }
			)
			.subscribe(
				() => {
					this.requestInProgress = false;
				},
				() => {
					this.requestInProgress = false;
				}
			);
	}

	public removePermission(name) {
		this.requestInProgress = true;
		this.http
			.put(
				'/Group/' + this.id + '/removePermission/' + this.getPermisionId(name).permissionId,
				{},
				{ withCredentials: true }
			)
			.subscribe(
				() => {
					this.requestInProgress = false;
				},
				() => {
					this.requestInProgress = false;
				}
			);
	}

	private getPermisionId(name): Permission {
		return this.existingPermissionsRaw.filter((permission) => permission.name === name)[0];
	}
}
