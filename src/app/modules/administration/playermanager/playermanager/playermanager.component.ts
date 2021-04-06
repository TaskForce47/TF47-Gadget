import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	templateUrl: './playermanager.component.html',
	styleUrls: ['./playermanager.component.scss'],
})
export class PlayermanagerComponent implements OnInit {
	constructor(private http: HttpClient) {}

	public players = [];
	public playersFiltered = [];
	searchValue: any;
	ngOnInit(): void {
		this.getPlayers();
	}

	private getPlayers() {
		this.http.get('/Player', { withCredentials: true }).subscribe((res: Array<object>) => {
			this.players = res;
			this.playersFiltered = this.players;
		});
	}

	public filterPlayers() {
		const filter = this.searchValue.toLowerCase();
		this.playersFiltered = this.players.filter((m: { playerName: string }) =>
			m.playerName.toLowerCase().includes(filter)
		);
	}
}
