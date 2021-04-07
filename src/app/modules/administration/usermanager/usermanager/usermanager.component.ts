import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './usermanager.component.html',
	styleUrls: ['./usermanager.component.scss'],
})
export class UsermanagerComponent implements OnInit {
	constructor(private http: HttpClient) {}
	@ViewChild('searchContainer', { static: true }) searchContainer: ElementRef;
	public searchValue: any;
	public searchHeight: number;
	public searchWidth: string;
	public users = [];
	public usersFiltered = [];
	ngOnInit(): void {
		this.getUsers();
		this.calcDimensions();
	}
	@HostListener('window:resize', ['$event'])
	onResize() {
		this.calcDimensions();
	}

	private calcDimensions() {
		if (window.innerWidth > 991) {
			this.searchWidth = '250px';
			this.searchHeight = this.searchContainer.nativeElement.getBoundingClientRect().height - 120;
		} else {
			this.searchWidth = '100%';
			this.searchHeight = 250;
		}
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
