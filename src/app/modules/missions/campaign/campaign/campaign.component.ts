import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MenuItem } from 'primeng/api';

@Component({
	templateUrl: './campaign.component.html',
	styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
	public campaign: Campaign;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Description',
			routerLink: 'description',
		},
		{
			label: 'Missions',
			routerLink: 'missions/overview',
		},
	];
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.http.get('/Campaign/' + params.id).subscribe((res: Campaign) => {
				this.campaign = res;
			});
		});
	}
}
