import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

@Component({
	selector: 'app-guide',
	templateUrl: './guide.component.html',
	encapsulation: ViewEncapsulation.None,
})
export class GuideComponent implements OnInit {
	public guides: { id: number }[];
	public ready: boolean = false;
	public selectedGuide;
	public id: number = 1;
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute) {}

	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.id = +params.id;
			this.http
				.get('https://raw.githubusercontent.com/TaskForce47/TF47-Guides/main/guides.json')
				.subscribe((res: { guides: [] }) => {
					this.guides = res.guides;
					this.selectedGuide = this.guides.filter((guide: { id: number }) => guide.id === this.id)[0];
				});
		});
	}

	selectGuide(guide: object) {
		this.selectedGuide = guide;
	}
}
