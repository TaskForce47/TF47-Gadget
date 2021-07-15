import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Squad } from '../../../../core/models/Gadget';
import { ModalComponent } from '../../../../ui/modal/modal.component';

@Component({
	selector: 'app-squad-wrapper',
	templateUrl: './squad-wrapper.component.html',
	styleUrls: ['./squad-wrapper.component.scss'],
})
export class SquadWrapperComponent implements OnInit {
	@ViewChild('uploadImage') uploadImageModal: ModalComponent;
	public loading: boolean = true;
	public squad: Squad;
	public id: number;
	public rebuildInProgress: boolean = false;
	public deleteInProgress: boolean = false;
	public subnaviItems: MenuItem[] = [
		{
			label: 'Members',
			routerLink: 'profile',
			routerLinkActiveOptions: { exact: true },
		},
		{
			label: 'Settings',
			routerLink: 'settings',
			routerLinkActiveOptions: { exact: true },
		},
	];
	file: any;
	fileBin: any;

	constructor(
		private http: HttpClient,
		private activatedRoute: ActivatedRoute,
		private confirmationService: ConfirmationService,
		private router: Router
	) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.id = params.id;
			this.loadSquad();
		});
	}

	loadSquad() {
		this.loading = true;
		this.http.get('/Squad/' + this.id, { withCredentials: true }).subscribe((res: Squad) => {
			this.squad = res;
			this.loading = false;
		});
	}

	rebuildXml() {
		this.rebuildInProgress = true;
		this.http.post('/Squad/' + this.id + '/rebuild', {}, { withCredentials: true }).subscribe(
			() => {
				this.rebuildInProgress = false;
			},
			() => {
				this.rebuildInProgress = false;
			}
		);
	}

	public confirmDelete() {
		this.confirmationService.confirm({
			message: 'Are you sure that you want to perform this action?',
			accept: () => {
				this.deleteInProgress = true;
				this.http.delete('/Squad/' + this.id, { withCredentials: true }).subscribe(() => {
					this.deleteInProgress = false;
					this.router.navigate(['../'], { relativeTo: this.activatedRoute });
				});
			},
		});
	}

	public copyLink(squad: Squad) {
		navigator.clipboard.writeText(squad.squadXmlLink);
	}

	public openUploadModal() {
		this.uploadImageModal.open();
	}

	onFileChanged(event) {
		const files = event.target.files;
		if (files.length === 0) return;

		const mimeType = files[0].type;
		if (mimeType.match(/image\/*/) == null) {
			return;
		}

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);
		reader.onload = (_event) => {
			this.file = reader.result;
		};
		this.fileBin = files[0];
	}

	public upload() {
		const formData = new FormData();
		formData.set('file', this.fileBin);
		this.http.put('/Squad/' + this.id + '/uploadLogo', formData, { withCredentials: true }).subscribe(() => {
			this.loadSquad();
			this.uploadImageModal.close();
		});
	}
}
