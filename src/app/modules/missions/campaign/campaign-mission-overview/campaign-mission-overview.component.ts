import { Component, OnInit } from '@angular/core';
import { HeaderButton } from '../../../../ui/table/table.component';
import { Campaign } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-campaign-mission-overview',
	templateUrl: './campaign-mission-overview.component.html',
	styleUrls: ['./campaign-mission-overview.component.scss'],
})
export class CampaignMissionOverviewComponent implements OnInit {
	public defaultHeaders: any = [];
	public data: any;
	public headers: any = [];
	public loading: boolean = true;
	public ready: boolean = false;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'View', action: 'view', selectable: true },
		{ title: 'Delete', action: 'delete', selectable: true },
	];
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'missionType'];
		this.headers.push(
			{ field: 'missionId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'missionType', header: 'Type' }
		);
		this.activatedRoute.parent.params.subscribe((params) => {
			this.http.get('/Campaign/' + params.id).subscribe((res: Campaign) => {
				this.data = res.missions;
				this.loading = false;
			});
		});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'view':
				this.router.navigate(['../', $event[2].missionId], { relativeTo: this.activatedRoute });
				break;
		}
	}
}
