import { Component, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HeaderButton } from '../../../../ui/table/table.component';
import { FormGroup } from '@angular/forms';
import { ModalComponent } from 'src/app/ui/modal/modal.component';

@Component({
	selector: 'app-squad-overview',
	templateUrl: './squad-overview.component.html',
	styleUrls: ['./squad-overview.component.scss'],
})
export class SquadOverviewComponent implements OnInit {
	public defaultHeaders: any = [];
	public loading: any;
	public data: any;
	public headers: any = [];
	private noteSubscription: Subscription;
	public ready: boolean = false;

	@ViewChild('addModal') addModal: ModalComponent;
	public headerAction: HeaderButton[] = [
		{ title: 'Add', action: 'add' },
		{ title: 'View', action: 'view', selectable: true },
		{ title: 'Delete', action: 'delete', selectable: true },
	];
	constructor(private router: Router, private activatedRouter: ActivatedRoute, private http: HttpClient) {}

	ngOnInit(): void {
		this.defaultHeaders = ['squadName', 'squadNick', 'squadWeb'];
		this.headers.push(
			{ field: 'squadEmail', header: 'Email' },
			{ field: 'squadName', header: 'Name' },
			{ field: 'squadNick', header: 'Nick' },
			{ field: 'squadTitle', header: 'Title' },
			{ field: 'squadWeb', header: 'Web' }
		);
		this.loadSquads();
	}

	ngOnDestroy() {
		this.noteSubscription.unsubscribe();
	}

	loadSquads() {
		this.loading = true;
		this.noteSubscription = this.http.get('/Squad/getSquads').subscribe((res) => {
			this.data = res;
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
				this.deleteSquad($event[2]);
				break;
			case 'view':
				this.router.navigate(['../', $event[2].id], { relativeTo: this.activatedRouter });
				break;
		}
	}

	deleteSquad(squadData: any) {
		this.http.delete('/Squad/' + squadData.id).subscribe((res) => {
			this.loadSquads();
		});
	}

	submit() {
		if (true) {
			const headers = new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' });
			this.http.put('/PlayerNotes/addNote', JSON.stringify({}), { headers }).subscribe((res) => {
				this.loadSquads();
				this.addModal.close();
			});
		}
	}
}
