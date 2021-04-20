import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Mission } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-mission-profile',
	templateUrl: './mission-profile.component.html',
	styleUrls: ['./mission-profile.component.scss'],
})
export class MissionProfileComponent implements OnInit {
	public mission: Mission;
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.activatedRoute.parent.params.subscribe((params) => {
			this.http.get('/Mission/' + params.mid).subscribe((res: Mission) => {
				this.mission = res;
			});
		});
	}
}
