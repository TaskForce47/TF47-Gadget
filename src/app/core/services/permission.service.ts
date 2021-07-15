import { Injectable } from '@angular/core';
import { Group } from '../models/Gadget';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
	providedIn: 'root',
})
export class PermissionService {
	private permissions$ = [];

	public fetchGroups() {
		if (!this.auth.isCookieSet()) return;
		this.http.get('/Group/me', { withCredentials: true }).subscribe((groups: Group[]) => {
			const permissionTmp = groups.map((group) => group.permissions.map((permission) => permission.name));
			this.permissions$ = [].concat.apply([], permissionTmp);
		});
	}

	public hasPermission(name: string) {
		return this.permissions$.includes(name);
	}

	constructor(private http: HttpClient, private auth: AuthService) {}
}
