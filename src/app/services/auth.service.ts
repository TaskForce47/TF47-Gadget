import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
export interface UserDetails {
	avatar: string;
	forumId: number;
	playerUid: string;
	profileName: string;
	roles: Array<string>;
}
@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public details$ = this.http.get('/user/getUserDetails').pipe(shareReplay()) as Observable<UserDetails>;
	constructor(private http: HttpClient) {}

	public authenticate() {
		this.http.get('/user/authenticate').subscribe();
	}
}
