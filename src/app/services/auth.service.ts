import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
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
	// public details$ = this.http.get('/user/getUserDetails').pipe(shareReplay()) as Observable<UserDetails>;
	public details$ = of({
		avatar: '',
		forumId: 123,
		playerUid: '1337',
		profileName: 'RednecksRevenge',
		roles: ['Admin'],
	});
	constructor(private http: HttpClient, private router: Router, private activatedRoute: ActivatedRoute) {}

	public authenticate() {
		// this.http.get('/user/authenticate').subscribe();
		const loggedIn = false;
		if (!loggedIn) {
			this.router.navigate(['./'], { relativeTo: this.activatedRoute });
		}
		return of(loggedIn);
	}
}
