import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Campaign } from '../../../../core/models/Gadget';

@Component({
	templateUrl: './campaign-profile.component.html',
	styleUrls: ['./campaign-profile.component.scss'],
})
export class CampaignProfileComponent implements OnInit {
	public campaign: Campaign;
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.activatedRoute.parent.params.subscribe((params) => {
			this.http.get('/Campaign/' + params.id).subscribe((res: Campaign) => {
				this.campaign = res;
			});
		});
	}
}
