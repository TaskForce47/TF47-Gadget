import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { GameServer, Mission } from '../../../../core/models/Gadget';
import { HeaderButton } from '../../../../ui/table/table.component';

@Component({
	selector: 'app-event-overview',
	templateUrl: './event-overview.component.html',
	styleUrls: ['./event-overview.component.scss'],
})
export class EventOverviewComponent implements OnInit {
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	public data: Mission[] = [
		{
			missionId: 1,
			name: 'Bing Bing',
			descriptionShort: 'Ballern',
			missionType: 'COOP',
			campaignName: 'Geil',
			campaignId: 1,
			description: 'caio',
		},
	];
	public defaultHeaders: any = [];
	public headers: any = [];
	public loading: boolean = true;
	public ready: boolean = false;

	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'View', action: 'view', selectable: true },
	];

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'descriptionShort', 'missionType'];
		this.headers.push(
			{ field: 'missionId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'descriptionShort', header: 'Description' },
			{ field: 'missionType', header: 'Type' },
			{ field: 'campaignId', header: 'Campaign ID' },
			{ field: 'campaignName', header: 'Campaign' }
		);
		this.loadServers();
		this.ready = true;
		this.loading = false;
	}

	loadServers() {
		/*		this.loading = true;
		this.http.get('/GameServer').subscribe((res: GameServer[]) => {
			this.data = res;
			this.loading = false;
		});*/
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'view':
				this.router.navigate(['../', $event[2].missionId], { relativeTo: this.activatedRouter });
				break;
			case 'add':
				this.router.navigate(['../', 'add'], { relativeTo: this.activatedRouter });
				break;
		}
	}
}
