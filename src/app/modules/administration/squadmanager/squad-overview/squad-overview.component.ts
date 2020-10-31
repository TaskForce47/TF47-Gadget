import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderButton } from '../../../../ui/table/table.component';

@Component({
	selector: 'app-squad-overview',
	templateUrl: './squad-overview.component.html',
	styleUrls: ['./squad-overview.component.scss'],
})
export class SquadOverviewComponent implements OnInit {
	public defaultHeaders: any = [];
	public loading: any;
	public data: any;
	public headers: any = [];
	private noteSubscription: Subscription;
	public ready: boolean = false;

	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'View', action: 'view', selectable: true },
		{ title: 'Delete', action: 'delete', selectable: true },
	];
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['squadName', 'squadNick', 'squadWeb'];
		this.headers.push(
			{ field: 'squadEmail', header: 'Email' },
			{ field: 'squadName', header: 'Name' },
			{ field: 'squadNick', header: 'Nick' },
			{ field: 'squadTitle', header: 'Title' },
			{ field: 'squadWeb', header: 'Web' }
		);
		this.loadSquads();
	}

	ngOnDestroy() {
		this.noteSubscription.unsubscribe();
	}

	loadSquads() {
		this.loading = true;
		this.noteSubscription = this.http.get('/Squad/getSquads').subscribe((res) => {
			this.data = res;
			this.loading = false;
			if (this.ready !== true) {
				this.ready = true;
			}
		});
	}
}
