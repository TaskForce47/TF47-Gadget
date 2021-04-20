import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng/api';
import { Campaign } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './campaign-overview.component.html',
	styleUrls: ['./campaign-overview.component.scss'],
})
export class CampaignOverviewComponent implements OnInit {
	cols: any[];
	files: TreeNode[];
	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.cols = [{ field: 'name', header: 'Name' }];
		this.http.get('/Campaign').subscribe((res: Campaign[]) => {
			const tmpData = [];
			let tmpMissions = [];
			res.forEach((resss) => {
				resss.missions.forEach((mission) => {
					tmpMissions.push({
						data: mission,
						leaf: true,
					});
				});
				tmpData.push({
					data: resss,
					children: tmpMissions,
				});
				tmpMissions = [];
			});
			this.files = tmpData;
		});
	}
}
