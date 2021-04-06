import { Component, OnInit } from '@angular/core';
import { User } from '../../../../models/Gadget';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-user-keys',
	templateUrl: './user-keys.component.html',
	styleUrls: ['./user-keys.component.scss'],
})
export class UserKeysComponent implements OnInit {
	public defaultHeaders: any = ['description', 'timeCreated', 'timeValidUntil', 'apiKey'];
	public headers: any = [
		{ field: 'apiKeyId', header: 'ID' },
		{ field: 'description', header: 'Description' },
		{ field: 'timeCreated', header: 'Created At' },
		{ field: 'timeValidUntil', header: 'Valid until' },
		{ field: 'apiKey', header: 'Key' },
	];
	public keys: any = [];
	public loadingKeys: boolean = true;
	public user: User;
	constructor(private http: HttpClient, private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.details$.subscribe((user) => {
			this.user = user;
			this.loadKeys();
		});
	}

	public loadKeys() {
		this.loadingKeys = true;
		this.http.get('/ApiKey/' + this.user.userId + '/me', { withCredentials: true }).subscribe((res) => {
			this.keys = res;
			this.loadingKeys = false;
		});
	}
}
