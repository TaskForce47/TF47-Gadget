import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FieldSettings, GridSettings } from '../../../../ui/table/table.component';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-log-table',
	templateUrl: './log-table.component.html',
})
export class LogTableComponent implements OnInit, OnChanges {
	constructor(private http: HttpClient) {}
	@Input() type: string;
	public data: any = [];
	public headers: any = [];
	public defaultHeaders: any = [];
	public ready: boolean = false;
	public totalRecords: number;
	public loading: boolean = false;
	gridSettings: GridSettings = { endpointUrl: '' };
	public fieldSettings: FieldSettings = {
		channel: {
			styling: [
				{ class: 'field_info', condition: { field: 'channel', value: 'Direct', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'channel', value: 'Vehicle', operator: 'eq' } },
				{ class: 'field_success', condition: { field: 'channel', value: 'Group', operator: 'eq' } },
				{ class: 'field_side', condition: { field: 'channel', value: 'Side', operator: 'eq' } },
			],
		},
		ticketChange: {
			styling: [
				{ class: 'field_success', condition: { field: 'ticketChange', value: '0', operator: 'gt' } },
				{ class: 'field_critical', condition: { field: 'ticketChange', value: '0', operator: 'lt' } },
			],
		},
		type: {
			styling: [
				{ class: 'field_info', condition: { field: 'type', value: 'Info', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'type', value: 'Whitelist removed', operator: 'eq' } },
				{ class: 'field_critical', condition: { field: 'type', value: 'Ban', operator: 'eq' } },
				{ class: 'field_success', condition: { field: 'type', value: 'Whitelist added', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'type', value: 'Unban', operator: 'eq' } },
			],
		},
	};
	ngOnInit(): void {}

	private init() {
		this.defaultHeaders = [];
		this.headers = [];
		this.loading = true;
		switch (this.type) {
			case 'chat':
				this.gridSettings.endpointUrl = '/Stats/chat';
				this.defaultHeaders = ['channel', 'playerName', 'timeSend', 'message'];
				this.headers = [
					{ field: 'channel', header: 'Channel' },
					{ field: 'playerName', header: 'Player Name' },
					{ field: 'missionName', header: 'Mission' },
					{ field: 'timeSend', header: 'Date' },
					{ field: 'message', header: 'Message' },
					{ field: 'sessionId', header: 'Session ID' },
					{ field: 'id', header: 'ID' },
					{ field: 'playerId', header: 'Player ID' },
					{ field: 'missionType', header: 'Mission Type' },
					{ field: 'missionId', header: 'Mission ID' },
				];
				this.loadChat('/1');
				break;
			case 'ticket':
				this.gridSettings.endpointUrl = '/Stats/TicketLog';
				this.defaultHeaders = [
					'missionName',
					'playerName',
					'ticketChangeTime',
					'ticketNow',
					'ticketChange',
					'message',
				];
				this.headers = [
					{ field: 'id', header: 'ID' },
					{ field: 'missionName', header: 'Mission' },
					{ field: 'missionType', header: 'Mission Type' },
					{ field: 'missionId', header: 'Mission ID' },
					{ field: 'sessionId', header: 'Session ID' },
					{ field: 'ticketChangeTime', header: 'Date' },
					{ field: 'message', header: 'Message' },
					{ field: 'ticketNow', header: 'Current Tickets' },
					{ field: 'ticketChange', header: 'Ticket Change' },
				];
				this.loadTickets('/1');
				break;
			case 'gadget':
				this.gridSettings.endpointUrl = '/PlayerNotes/getLatest';
				this.defaultHeaders = ['author', 'playerName', 'timeWritten', 'type', 'note'];
				this.headers = [
					{ field: 'id', header: 'ID' },
					{ field: 'author', header: 'Moderator' },
					{ field: 'playerName', header: 'Name' },
					{ field: 'timeWritten', header: 'Date' },
					{ field: 'type', header: 'Typ' },
					{ field: 'note', header: 'Note' },
				];
				this.loadGadgetNotes('/1');
				break;
		}
	}

	ngOnChanges(changes: SimpleChanges) {
		this.init();
	}

	onPage($event: any) {
		let firstElementId;
		this.loading = true;
		if ($event.first === $event.rows || $event.first === $event.rows * 2) {
			firstElementId = $event.first * 2;
			console.log();
		} else {
			firstElementId = $event.first;
		}

		switch (this.type) {
			case 'chat':
				this.loadChat('/' + firstElementId / $event.rows + '?rows=' + $event.rows);
				break;
			case 'ticket':
				this.loadTickets('/' + firstElementId / $event.rows + '?rows=' + $event.rows);
				break;
			case 'gadget':
				this.loadGadgetNotes('/' + firstElementId / $event.rows + '?rows=' + $event.rows);
				break;
		}
	}

	getRequestUrl(params?: string) {
		let requestUrl;
		if (params) {
			requestUrl = this.gridSettings.endpointUrl + params;
		} else {
			requestUrl = this.gridSettings.endpointUrl;
		}
		return requestUrl;
	}

	loadTickets(params?: string) {
		this.http
			.get(this.getRequestUrl(params))
			.subscribe((res: { totalTicketCount: number; ticketLog: Array<any> }) => {
				this.data = res.ticketLog;
				this.totalRecords = res.totalTicketCount;
				this.loading = false;
				this.ready = true;
			});
	}

	loadChat(params?: string) {
		this.http.get(this.getRequestUrl(params)).subscribe((res: { totalChatCount: number; chats: Array<any> }) => {
			this.data = res.chats;
			this.totalRecords = res.totalChatCount;
			this.loading = false;
			this.ready = true;
		});
	}

	loadGadgetNotes(params?: string) {
		this.http.get(this.getRequestUrl(params)).subscribe((res: { totalNoteCount: number; notes: Array<any> }) => {
			this.data = res.notes;
			this.totalRecords = res.totalNoteCount;
			this.loading = false;
			this.ready = true;
		});
	}
}
