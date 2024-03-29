import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../models/Gadget';
import { Router } from '@angular/router';

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	public details$ = this.isCookieSet()
		? (this.http.get('/User/me', { withCredentials: true }).pipe(shareReplay()) as Observable<User>)
		: new Observable<null>();
	public isCookieSet() {
    if(document.cookie.indexOf('OperationDachdaggerAuthCookie') === -1) {
        this.router.navigate(['/login']);
        return false;
    }

		return true;
	}

	public logout() {
		this.http.get('/Authentication/logout', { withCredentials: true }).subscribe(() => {
			location.reload();
		});
	}
	constructor(private http: HttpClient, private router: Router) {}
}
