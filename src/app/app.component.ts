import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { PermissionService } from './core/services/permission.service';
import * as signalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { MessageService } from 'primeng/api';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
	private connection: HubConnection;
	constructor(
		private auth: AuthService,
		private permissionService: PermissionService,
		private notificationService: MessageService
	) {}
	ngOnInit() {
		this.auth.details$.subscribe(() => {});
		this.permissionService.fetchGroups();
		this.connection = new signalR.HubConnectionBuilder().withUrl('https://beta.taskforce47.com/notification').build();
		this.connection.start().then(() => {
			this.notificationService.add({ severity: 'success', summary: 'Websocket connected' });
		});
		this.connection.on('ChangelogCreated', (res) => {
			console.log(res);
		});
	}
}
