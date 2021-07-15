import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './playermanager.component.html',
	styleUrls: ['./playermanager.component.scss'],
})
export class PlayermanagerComponent implements OnInit {
	constructor(private http: HttpClient) {}
	@ViewChild('searchContainer', { static: true }) searchContainer: ElementRef;
	public searchHeight: number;
	public searchWidth: string;
	public players = [];
	public playersFiltered = [];
	public searchValue: any;
	ngOnInit(): void {
		this.getPlayers();
		this.calcDimensions();
	}

	private getPlayers() {
		this.http.get('/Player', { withCredentials: true }).subscribe((res: Array<object>) => {
			this.players = res;
			this.playersFiltered = this.players;
		});
	}

	@HostListener('window:resize', ['$event'])
	onResize() {
		this.calcDimensions();
	}

	private calcDimensions() {
		if (window.innerWidth > 991) {
			this.searchWidth = '250px';
			this.searchHeight = this.searchContainer.nativeElement.getBoundingClientRect().height - 120;
		} else {
			this.searchWidth = '100%';
			this.searchHeight = 250;
		}
	}

	public filterPlayers() {
		const filter = this.searchValue.toLowerCase();
		this.playersFiltered = this.players.filter((m: { playerName: string }) =>
			m.playerName.toLowerCase().includes(filter)
		);
	}
}
