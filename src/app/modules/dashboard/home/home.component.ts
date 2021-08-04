import { Component, OnInit } from '@angular/core';
import { GameServer } from '../../../core/models/Gadget';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
	constructor(private http: HttpClient) {}

	public servers: GameServer[] = [];
	ngOnInit(): void {
		this.http.get('/GameServer').subscribe((res: GameServer[]) => {
			this.servers = res;
		});
	}
}
