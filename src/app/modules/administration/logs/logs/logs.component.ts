import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
	selector: 'app-logs',
	templateUrl: './logs.component.html',
	styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
	constructor(private activatedRoute: ActivatedRoute, private router: Router) {}
	public type: string = 'chat';
	public ready: boolean = false;
	ngOnInit(): void {
		this.activatedRoute.params.subscribe((params) => {
			this.ready = false;
			this.type = params.type;
			this.ready = true;
		});
	}

	public subnaviItems: MenuItem[] = [
		{
			label: 'Chat',
			routerLink: ['../', 'chat'],
		},
		{
			label: 'Ticket',
			routerLink: ['../', 'ticket'],
		},
		{
			label: 'Gadget',
			routerLink: ['../', 'gadget'],
		},
	];
}
