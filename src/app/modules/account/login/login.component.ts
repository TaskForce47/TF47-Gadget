import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss'],
	encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
	constructor(private authService: AuthService, private router: Router, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.authService.details$.subscribe((data) => {});
	}

	submit() {}
}
