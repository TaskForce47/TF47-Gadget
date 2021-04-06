import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Squad } from '../../../models/Gadget';

@Component({
	selector: 'app-squads',
	templateUrl: './squads.component.html',
	styleUrls: ['./squads.component.scss'],
})
export class SquadsComponent implements OnInit {
	constructor(private http: HttpClient) {}

	public squads: Squad[];
	ngOnInit(): void {
		this.http.get('/Squad', { withCredentials: true }).subscribe((res: Squad[]) => {
			this.squads = res;
		});
	}
}
