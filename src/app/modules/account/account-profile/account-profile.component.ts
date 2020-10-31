import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
export interface Squad {
	squadId: number;
	squadNick: string;
	squadTitle: string;
	squadEmail: string;
	squadWeb: string;
	squadHasPicture: boolean;
	remark: string;
	email: string;
}
@Component({
	selector: 'app-account-profile',
	templateUrl: './account-profile.component.html',
	styleUrls: ['./account-profile.component.scss'],
})
export class AccountProfileComponent implements OnInit, OnDestroy {
	private squadSubscription: Subscription;
	public squads: Array<Squad>;
	public ready: boolean = false;

	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.ready = false;
		this.squadSubscription = this.http.get('/User/getSquads').subscribe((res: Array<Squad>) => {
			this.squads = res;
			this.ready = true;
		});
	}

	ngOnDestroy() {
		this.squadSubscription.unsubscribe();
	}
}
