import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

export interface Whitelist {
	enabled: boolean;
	id: number;
	whitelistName: string;
}

@Component({
	selector: 'app-player-whitelist',
	templateUrl: './player-whitelist.component.html',
	styleUrls: ['./player-whitelist.component.scss'],
})
export class PlayerWhitelistComponent implements OnInit {
	public whitelists: Array<Whitelist>;
	public ready: boolean = false;
	private routeSubscription: Subscription;
	private playerId: any;
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.playerId = res.id;
		});
		if (this.playerId !== 'playermanager') {
			this.http
				.get('/whitelist/' + this.playerId + '/getWhitelist')
				.subscribe((res: { whitelists: Array<Whitelist> }) => {
					this.whitelists = res[0].whitelists;
					this.ready = true;
				});
		}
	}

	updateWhitelist(event, whitelist) {
		const reqObj = [{ playerId: Number(this.playerId), whitelistId: whitelist.id, enabled: event.checked }];
		this.http.put('/whitelist/whitelistUser', reqObj).subscribe((res) => {});
	}
}
