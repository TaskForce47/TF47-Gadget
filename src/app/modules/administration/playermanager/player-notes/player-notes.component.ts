import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FieldSettings, HeaderButton } from '../../../../ui/table/table.component';
import { ModalComponent } from '../../../../ui/modal/modal.component';
import { AuthService } from '../../../../core/services/auth.service';
import {
	DynamicFormGroupModel,
	DynamicFormModel,
	DynamicFormService,
	DynamicInputModel,
	DynamicSelectModel,
	DynamicTextAreaModel,
} from '@ng-dynamic-forms/core';
import { FormGroup } from '@angular/forms';

@Component({
	selector: 'app-player-notes',
	templateUrl: './player-notes.component.html',
	styleUrls: ['./player-notes.component.scss'],
})
export class PlayerNotesComponent implements OnInit, OnDestroy {
	public defaultHeaders: any = ['writerName', 'timeCreated', 'type', 'text'];
	public loading: any;
	public data: any;
	public headers: any = [
		{ field: 'noteId', header: 'Note ID' },
		{ field: 'writerName', header: 'Writer' },
		{ field: 'timeCreated', header: 'Created Date' },
		{ field: 'timeUpdated', header: 'Updated Date' },
		{ field: 'type', header: 'Typ' },
		{ field: 'text', header: 'Text' },
	];
	private routeSubscription: Subscription;
	private noteSubscription: Subscription;
	public playerId: number | undefined | string;
	public ready: boolean = false;
	public headerAction: HeaderButton[] = [];
	public fieldSettings: FieldSettings = {
		type: {
			styling: [
				{ class: 'field_info', condition: { field: 'type', value: 'Info', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'type', value: 'Warning', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'type', value: 'Whitelist removed', operator: 'eq' } },
				{ class: 'field_critical', condition: { field: 'type', value: 'Ban', operator: 'eq' } },
				{ class: 'field_success', condition: { field: 'type', value: 'Whitelist added', operator: 'eq' } },
				{ class: 'field_warning', condition: { field: 'type', value: 'Unban', operator: 'eq' } },
			],
		},
	};
	myFormGroup: FormGroup;
	myFormModel: DynamicFormModel = [
		new DynamicFormGroupModel({
			id: 'playerNote',
			group: [
				new DynamicInputModel({
					id: 'playerUid',
					label: 'Name',
					required: true,
					hidden: true,
				}),
				new DynamicSelectModel({
					id: 'type',
					label: 'Type',
					required: true,
					value: 'Info',
					options: [
						{ label: 'Info', value: 'Info' },
						{ label: 'Warning', value: 'Warning' },
					],
				}),
				new DynamicTextAreaModel({
					id: 'text',
					label: 'Text',
					required: true,
				}),
			],
		}),
	];
	private selectedNote: any;
	constructor(
		private router: Router,
		private activatedRouter: ActivatedRoute,
		private http: HttpClient,
		private auth: AuthService,
		private formService: DynamicFormService
	) {}
	@ViewChild('addModal') addModal: ModalComponent;
	@ViewChild('editModal') editModal: ModalComponent;

	ngOnInit(): void {
		this.myFormGroup = this.formService.createFormGroup(this.myFormModel);
		this.routeSubscription = this.activatedRouter.parent.params.subscribe((res) => {
			this.auth.details$.subscribe((currentUser) => {
				this.playerId = res.id;
				this.loadNotes();
				this.headerAction = [
					{ title: 'Add', action: 'add' },
					{
						title: 'Edit',
						action: 'edit',
						selectable: true,
						condition: { field: 'writerId', value: currentUser.userId, operator: 'eq' },
					},
					{ title: 'Delete', action: 'delete', selectable: true },
				];
			});
		});
	}

	ngOnDestroy() {
		this.routeSubscription.unsubscribe();
		this.noteSubscription.unsubscribe();
	}

	loadNotes() {
		this.loading = true;
		this.noteSubscription = this.http
			.get('/Note/player/' + this.playerId, { withCredentials: true })
			.subscribe((res: { notes: Array<any> }) => {
				this.data = res;
				this.loading = false;
			});
	}

	headerButtonClicked($event) {
		switch ($event[1]) {
			case 'add':
				this.myFormGroup.reset();
				this.myFormGroup.patchValue({ playerNote: { playerUid: this.playerId } });
				this.addModal.open();
				break;
			case 'edit':
				this.editModal.open();
				this.myFormGroup.reset();
				this.selectedNote = $event[2];
				this.myFormGroup.patchValue({
					playerNote: { type: $event[2].type, text: $event[2].text },
				});
				break;
			case 'delete':
				this.deleteNote($event[2]);
				break;
		}
	}

	addNote() {
		this.http.post('/Note', this.myFormGroup.getRawValue().playerNote, { withCredentials: true }).subscribe(() => {
			this.loadNotes();
			this.addModal.close();
			this.myFormGroup.reset();
		});
	}

	editNote() {
		this.http
			.put(
				'/Note/' + this.selectedNote.noteId,
				{
					text: this.myFormGroup.get('playerNote.text').value,
					type: this.myFormGroup.get('playerNote.type').value,
				},
				{
					withCredentials: true,
				}
			)
			.subscribe(() => {
				this.loadNotes();
				this.addModal.close();
				this.myFormGroup.reset();
			});
	}

	deleteNote(noteData: any) {
		this.http.delete('/Note/' + noteData.noteId, { withCredentials: true }).subscribe(() => {
			this.loadNotes();
		});
	}
}
