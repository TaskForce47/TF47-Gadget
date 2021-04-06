import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Squad } from '../../../models/Gadget';
@Component({
	templateUrl: './account-profile.component.html',
	styleUrls: ['./account-profile.component.scss'],
})
export class AccountProfileComponent implements OnInit {
	public squads: Array<Squad>;
	public loading: boolean = true;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.loading = true;
		this.http.get('/Squad/me', { withCredentials: true }).subscribe((res: Array<Squad>) => {
			this.squads = res;
			this.loading = false;
		});
	}
}
