import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { HeaderButton, TableComponent } from '../../../../ui/table/table.component';
import { ModalComponent } from '../../../../ui/modal/modal.component';

export interface Whitelist {
	description: string;
	whitelistId: number;
	name: string;
}

@Component({
	templateUrl: './player-whitelist.component.html',
	styleUrls: ['./player-whitelist.component.scss'],
})
export class PlayerWhitelistComponent implements OnInit {
	public whitelists: Whitelist[];
	public whitelistsUser: Whitelist[];
	public ready: boolean = false;
	private routeSubscription: Subscription;
	private id: any;
	public headers: any = [];
	public loading: boolean = true;
	public loadingWhitelists: boolean = true;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add', permissions: ['whitelist:addplayer'] },
		{ title: 'Remove', action: 'remove', selectable: true, permissions: ['whitelist:removeplayer'] },
	];
	public defaultHeaders: any = [];
	public defaultHeadersWhitelists: any = [];
	public headersWhitelists: any = [];
	public requestInProgress: boolean = false;
	@ViewChild('addModal') addModal: ModalComponent;
	@ViewChild('addWhitelistGrid') addWhitelistGrid: TableComponent;
	@ViewChild('whitelistGrid') whitelistGrid: TableComponent;
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['name', 'description'];
		this.headers.push(
			{ field: 'whitelistId', header: 'ID' },
			{ field: 'name', header: 'Name' },
			{ field: 'description', header: 'Description' }
		);
		this.defaultHeadersWhitelists = ['name', 'description'];
		this.headersWhitelists.push({ field: 'name', header: 'Name' }, { field: 'description', header: 'Description' });
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.id = res.id;
			this.loadWhitelistUser();
			this.loadWhitelists();
		});
	}

	public addWhitelist() {
		this.requestInProgress = true;
		const payload = {
			playerUid: this.id,
			whitelistId: this.addWhitelistGrid.selectedItems.whitelistId,
		};
		this.http.put('/Whitelist/' + 'userWhitelisting', payload, { withCredentials: true }).subscribe((res) => {
			this.loadWhitelists();
			this.loadWhitelistUser();
			this.requestInProgress = false;
		});
	}

	public removeWhitelist() {
		this.requestInProgress = true;
		const payload = {
			playerUid: this.id,
			whitelistId: this.whitelistGrid.selectedItems.whitelistId,
		};
		this.http.put('/Whitelist/' + 'removeWhitelisting', payload, { withCredentials: true }).subscribe((res) => {
			this.loadWhitelists();
			this.loadWhitelistUser();
			this.requestInProgress = false;
		});
	}

	public loadWhitelists() {
		this.loadingWhitelists = true;
		this.http
			.get('/Whitelist/user/' + this.id + '/nonMember', { withCredentials: true })
			.subscribe((res: Whitelist[]) => {
				this.whitelists = res;
				this.loadingWhitelists = false;
			});
	}

	public loadWhitelistUser() {
		this.loading = true;
		this.http
			.get('/Whitelist/user/' + this.id, { withCredentials: true })
			.subscribe((res: { whitelistings: Whitelist[] }) => {
				this.whitelistsUser = res.whitelistings;
				this.loading = false;
			});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.addModal.open();
				break;
			case 'remove':
				this.removeWhitelist();
				break;
		}
	}
}
