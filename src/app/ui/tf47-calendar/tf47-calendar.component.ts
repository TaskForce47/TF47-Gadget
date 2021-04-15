import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/angular';
@Component({
	selector: 'tf47-calendar',
	templateUrl: './tf47-calendar.component.html',
	styleUrls: ['./tf47-calendar.component.scss'],
})
export class Tf47CalendarComponent implements OnInit {
	options: CalendarOptions;
	constructor() {}

	ngOnInit() {
		this.options = {
			initialView: 'dayGridMonth',
			height: '100%',
			firstDay: 1,
			locale: 'en-GB',
			headerToolbar: {
				left: 'dayGridMonth,timeGridWeek,timeGridDay',
				center: 'title',
				right: 'prevYear,prev,next,nextYear',
			},
			eventTimeFormat: {
				hour: 'numeric',
				minute: '2-digit',
				hour12: false,
			},
			slotLabelFormat: {
				hour: 'numeric',
				minute: '2-digit',
				hour12: false,
			},
			events: [
				{
					id: 'a',
					title: 'Taskforce explodiert',
					start: '2021-04-16T08:00:00',
					allDay: false,
				},
			],
		};
	}
}
