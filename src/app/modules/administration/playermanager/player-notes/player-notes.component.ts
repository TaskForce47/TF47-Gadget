import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FieldSettings, HeaderButton } from '../../../../ui/table/table.component';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
	selector: 'app-player-notes',
	templateUrl: './player-notes.component.html',
	styleUrls: ['./player-notes.component.scss'],
})
export class PlayerNotesComponent implements OnInit {
	public defaultHeaders: any = [];
	public loading: any;
	public data: any;
	public headers: any = [];
	private routeSubscription: Subscription;
	private noteSubscription: Subscription;
	public playerId: number | undefined | string;
	public ready: boolean = false;
	public headerAction: HeaderButton[] = [];
	public fieldSettings: FieldSettings = {
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
	public form = new FormGroup({});
	public model = {};
	public fields: FormlyFieldConfig[] = [
		{
			key: 'type',
			type: 'select',
			defaultValue: 'Info',
			templateOptions: {
				label: 'Type',
				required: true,
				type: 'string',
				options: [
					{ value: 'Info', label: 'Info' },
					{ value: 'Warning', label: 'Warning' },
				],
			},
		},
		{
			key: 'note',
			type: 'textarea',
			templateOptions: {
				label: 'Note',
				required: true,
				attributes: {
					style: 'width: 100%; min-height: 5rem;',
				},
			},
		},
	];
	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: HttpClient,
		private auth: AuthService
	) {}
	@ViewChild('addModal') addModal: ModalComponent;

	ngOnInit(): void {
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.playerId = res.id;
			this.defaultHeaders = ['authorName', 'timeWritten', 'type', 'note'];
			this.headers.push(
				{ field: 'authorName', header: 'Moderator' },
				{ field: 'timeWritten', header: 'Date' },
				{ field: 'type', header: 'Typ' },
				{ field: 'note', header: 'Note' }
			);
		});
		if (this.playerId !== 'playermanager') {
			this.loadNotes();
			this.auth.details$.subscribe((res) => {
				let headers: HeaderButton[] = [
					{ title: 'Add', action: 'add' },
					{
						title: 'Edit',
						action: 'edit',
						selectable: true,
						condition: { field: 'authorId', value: 2, operator: 'eq' },
					},
				];
				if (res.roles.includes('Admin')) {
					headers.push({ title: 'Delete', action: 'delete', selectable: true });
				}
				this.headerAction = headers;
			});

			this.model = { playerId: Number(this.playerId) };
		}
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.noteSubscription.unsubscribe();
	}

	loadNotes() {
		this.loading = true;
		this.noteSubscription = this.http
			.get('/player/' + this.playerId + '/getNotes')
			.subscribe((res: { notes: Array<any> }) => {
				this.data = res.notes;
				this.loading = false;
				if (this.ready !== true) {
					this.ready = true;
				}
			});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.addModal.open();
				break;
			case 'delete':
				console.log($event);
				this.deleteNote($event[2]);
				break;
		}
	}

	submit() {
		if (this.form.valid) {
			const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
			this.http.put('/PlayerNotes/addNote', JSON.stringify(this.model), { headers }).subscribe((res) => {
				this.loadNotes();
				this.addModal.close();
			});
		}
	}

	deleteNote(noteData: any) {
		this.http.delete('/PlayerNotes/' + noteData.nodeId + '/delete').subscribe((res) => {
			console.log(res);
			this.loadNotes();
		});
	}
}
