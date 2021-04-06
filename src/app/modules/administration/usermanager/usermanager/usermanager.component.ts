import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './usermanager.component.html',
	styleUrls: ['./usermanager.component.scss'],
})
export class UsermanagerComponent implements OnInit {
	constructor(private http: HttpClient) {}

	public users = [];
	public usersFiltered = [];
	searchValue: any;
	ngOnInit(): void {
		this.getUsers();
	}

	private getUsers() {
		this.http.get('/User', { withCredentials: true }).subscribe((res: Array<object>) => {
			this.users = res;
			this.usersFiltered = this.users;
		});
	}

	public filterUsers() {
		const filter = this.searchValue.toLowerCase();
		this.usersFiltered = this.users.filter((m: { username: string }) => m.username.toLowerCase().includes(filter));
	}
}
