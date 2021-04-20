import { Component, OnInit } from '@angular/core';
import { Campaign } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-campaign-description',
	templateUrl: './campaign-description.component.html',
	styleUrls: ['./campaign-description.component.scss'],
})
export class CampaignDescriptionComponent implements OnInit {
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
