import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './campaign.component.html',
	styleUrls: ['./campaign.component.scss'],
})
export class CampaignComponent implements OnInit {
	public campaign: Campaign;
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.http.get('/Campaign/' + params.id).subscribe((res: Campaign) => {
				this.campaign = res;
			});
		});
	}
}
