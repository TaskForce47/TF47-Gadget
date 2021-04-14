import { Component, OnInit } from '@angular/core';
import { Mission } from '../../../../core/models/Gadget';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './mission.component.html',
	styleUrls: ['./mission.component.scss'],
})
export class MissionComponent implements OnInit {
	public mission: Mission;
	constructor(private router: Router, private activatedRoute: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.http.get('/Mission/' + params.mid).subscribe((res: Mission) => {
				this.mission = res;
			});
		});
	}
}
