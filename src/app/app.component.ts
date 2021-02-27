import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	constructor(private auth: AuthService) {}
	public isAuthenticated: boolean = false;
	ngOnInit() {
		this.auth.authenticate().subscribe((isAuthenticated) => {
			this.isAuthenticated = isAuthenticated;
		});
	}
}
