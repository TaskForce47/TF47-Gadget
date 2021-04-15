import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './changelog.component.html',
	styleUrls: ['./changelog.component.scss'],
})
export class ChangelogComponent implements OnInit {
	public changelogs: [];
	public ready: boolean = false;
	constructor(private http: HttpClient) {}

	ngOnInit(): void {
		this.http.get('/changelog').subscribe((changelogs: []) => {
			this.changelogs = changelogs;
			this.ready = true;
		});
	}
}
