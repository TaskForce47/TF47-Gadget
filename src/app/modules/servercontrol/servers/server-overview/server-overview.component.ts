import { Component, OnInit } from '@angular/core';
import { GameServer } from '../../../../core/models/Gadget';
import { HttpClient } from '@angular/common/http';
import { HeaderButton } from '../../../../ui/table/table.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-server-overview',
	templateUrl: './server-overview.component.html',
	styleUrls: ['./server-overview.component.css'],
})
export class ServerOverviewComponent implements OnInit {
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	public servers: GameServer[] = [];
	public defaultHeaders: any = [];
	public data: any;
	public headers: any = [];
	public loading: boolean = true;
	public ready: boolean = false;

	public headerAction: HeaderButton[] = [{ title: 'View', action: 'view', selectable: true }];

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'description', 'gameServerStatus', 'lastTimeStarted'];
		this.headers.push(
			{ field: 'serverID', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' },
			{ field: 'gameServerStatus', header: 'Status' },
			{ field: 'ip', header: 'IP' },
			{ field: 'port', header: 'Port' },
			{ field: 'lastTimeStarted', header: 'Last Restart' },
			{ field: 'branch', header: 'Branch' }
		);
		this.loadServers();
		this.ready = true;
	}

	loadServers() {
		this.loading = true;
		this.http.get('/GameServer').subscribe((res: GameServer[]) => {
			this.data = res;
			this.loading = false;
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'view':
				this.router.navigate(['../', $event[2].serverID], { relativeTo: this.activatedRouter });
				break;
		}
	}
}
