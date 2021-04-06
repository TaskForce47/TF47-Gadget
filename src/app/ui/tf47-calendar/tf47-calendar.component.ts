import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
	selector: 'app-tf47-calendar',
	templateUrl: './tf47-calendar.component.html',
	styleUrls: ['./tf47-calendar.component.scss'],
})
export class Tf47CalendarComponent implements OnInit {
	events: any[];

	options: any;

	header: any;
	constructor() {}

	ngOnInit() {
		this.options = {
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			defaultDate: '2017-02-01',
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay',
			},
			editable: true,
		};
	}
}
