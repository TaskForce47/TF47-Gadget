import { Component, OnInit } from '@angular/core';
@Component({
	selector: 'app-calendar-overview',
	templateUrl: './calendar-overview.component.html',
	styleUrls: ['./calendar-overview.component.scss'],
})
export class CalendarOverviewComponent implements OnInit {
  public options;
	ngOnInit() {
    this.options = {
			initialView: window.innerWidth > 922 ?'dayGridMonth': 'timeGrid',
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
			eventClick(event) {
				console.log(event.event.id);
			},
			events: [
				{
					id: '1',
					title: 'Taskforce explodiert',
					start: '2021-04-16T08:00:00',
					allDay: false,
				},
			],
		};
  }
}
