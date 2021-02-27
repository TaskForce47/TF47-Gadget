import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';

export interface GadgetUser {
	id: number;
	forumName: string;
	avatarUrl: string;
	roles: string[];
}

export interface Player {
	id: number;
	name: string;
	uid: string;
	isBanned: boolean;
	bannedUntil?: any;
	gadgetUser?: GadgetUser;
}

@Component({
	selector: 'app-player-profile',
	templateUrl: './player-profile.component.html',
	styleUrls: ['./player-profile.component.scss'],
})
export class PlayerProfileComponent implements OnInit, OnDestroy {
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}
	public playerId: number | undefined | string;
	public player: Player;
	public loading: boolean = false;
	public routeSubscription: Subscription;
	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.params.subscribe((res) => {
			this.playerId = res.id;
			if (this.playerId !== 'playermanager') {
				this.loading = true;
				this.http.get('/player/' + this.playerId + '/details').subscribe((res: Player) => {
					this.player = res;
					this.loading = false;
				});
			}
		});
	}
	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
	}

	public subnaviItems: MenuItem[] = [
		{
			label: 'Notes',
			routerLink: 'notes',
		},
		{
			label: 'Whitelist',
			routerLink: 'whitelist',
		},
		{
			label: 'Chat',
			routerLink: 'chat',
		},
		{
			label: 'Stats',
			routerLink: 'stats',
		},
	];
}
