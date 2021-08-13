import { Component, Input, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
	selector: 'tf47-calendar',
	templateUrl: './tf47-calendar.component.html',
	styleUrls: ['./tf47-calendar.component.scss'],
})
export class Tf47CalendarComponent implements OnInit {
	@Input() options: CalendarOptions;
	constructor() {}

	ngOnInit() {}
}
