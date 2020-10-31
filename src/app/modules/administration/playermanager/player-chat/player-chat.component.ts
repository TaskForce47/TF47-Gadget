import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FieldSettings } from '../../../../ui/table/table.component';

@Component({
	selector: 'app-player-chat',
	templateUrl: './player-chat.component.html',
	styleUrls: ['./player-chat.component.scss'],
})
export class PlayerChatComponent implements OnInit {
	public defaultHeaders: any = [];
	public loading: any;
	public data: any;
	public headers: any = [];
	private routeSubscription: Subscription;
	private noteSubscription: Subscription;
	public playerId: number | undefined | string;
	public ready: boolean = false;
	public fieldSettings: FieldSettings = {
		channel: {
			styling: [
				{ class: 'field_info', condition: { field: 'channel', value: 'Direct', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'channel', value: 'Vehicle', operator: 'eq' } },
				{ class: 'field_success', condition: { field: 'channel', value: 'Group', operator: 'eq' } },
				{ class: 'field_side', condition: { field: 'channel', value: 'Side', operator: 'eq' } },
			],
		},
	};
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.playerId = res.id;
			this.defaultHeaders = ['channel', 'missionName', 'timeSend', 'message'];
			this.headers.push(
				{ field: 'channel', header: 'Channel' },
				{ field: 'playerName', header: 'Name' },
				{ field: 'missionName', header: 'Mission' },
				{ field: 'timeSend', header: 'Date' },
				{ field: 'message', header: 'Message' }
			);
		});
		if (this.playerId !== 'playermanager') {
			this.loadNotes();
		}
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.noteSubscription.unsubscribe();
	}

	loadNotes() {
		this.loading = true;
		this.noteSubscription = this.http
			.get('/stats/chat?playerId=' + this.playerId)
			.subscribe((res: { chats: Array<any> }) => {
				this.data = res.chats;
				this.loading = false;
				if (this.ready !== true) {
					this.ready = true;
				}
			});
	}
}
