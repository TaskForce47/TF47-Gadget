import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-playermanager',
	templateUrl: './playermanager.component.html',
	styleUrls: ['./playermanager.component.scss'],
})
export class PlayermanagerComponent implements OnInit {
	constructor(private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

	public players = [];
	public playersFiltered = [];
	searchValue: any;
	ngOnInit(): void {
		this.getPlayers();
	}

	private getPlayers() {
		this.http.get('/Player/GetAllPlayers').subscribe((res: Array<object>) => {
			this.players = res;
			this.playersFiltered = this.players;
		});
	}

	public filterPlayers() {
		const filter = this.searchValue.toLowerCase();
		this.playersFiltered = this.players.filter((m: { name: string }) => m.name.toLowerCase().includes(filter));
	}

	public navigateToPlayer(player) {
		this.router.navigate([player.id], { relativeTo: this.activatedRoute });
	}
}
