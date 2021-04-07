import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../../core/services/auth.service';
import { User } from '../../../core/models/Gadget';

@Component({
	selector: 'app-account-keys',
	templateUrl: './account-keys.component.html',
	styleUrls: ['./account-keys.component.scss'],
})
export class AccountKeysComponent implements OnInit {
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
		this.http.get('/ApiKey/me', { withCredentials: true }).subscribe((res) => {
			this.keys = res;
			this.loadingKeys = false;
		});
	}
}
