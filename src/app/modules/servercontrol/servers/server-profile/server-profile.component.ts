import { Component, OnInit } from '@angular/core';
import serverProfileForm from '../../../../core/forms/server-profile';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { GameServer } from '../../../../core/models/Gadget';

@Component({
	selector: 'app-server-profile',
	templateUrl: './server-profile.component.html',
	styleUrls: ['./server-profile.component.css'],
})
export class ServerProfileComponent implements OnInit {
	public id: number;
	public server: GameServer;
	public formModel;
	public formFields;
	public ready: boolean = false;
	public loading: boolean = true;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.formFields = serverProfileForm;
		this.activatedRoute.parent.params.subscribe((params) => {
			this.id = params.id;
			this.loadServer();
		});
	}

	loadServer() {
		this.loading = true;
		this.http.get('/GameServer/' + this.id, { withCredentials: true }).subscribe((res: GameServer) => {
			this.server = res;
			this.formModel = {
				server: {
					name: this.server.name,
					description: this.server.description,
					gameServerStatus: this.server.gameServerStatus,
					ip: this.server.ip,
					port: this.server.port,
					lastTimeStarted: this.server.lastTimeStarted,
				},
			};
			this.ready = true;
			this.loading = false;
		});
	}
}
