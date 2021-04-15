import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
@Component({
	selector: 'app-calendar-overview',
	templateUrl: './calendar-overview.component.html',
	styleUrls: ['./calendar-overview.component.scss'],
})
export class CalendarOverviewComponent implements OnInit {
	events: any[];

	options: any;
	ngOnInit() {
		this.options = {
			plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
			defaultDate: '2017-02-01',
			header: {
				left: 'prev,next',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay',
			},
		};
	}
}
