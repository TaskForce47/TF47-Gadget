import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../core/services/auth.service';
import { Squad } from '../../core/models/Gadget';

@Component({
	selector: 'app-squad-card',
	templateUrl: './squad-card.component.html',
	styleUrls: ['./squad-card.component.scss'],
})
export class SquadCardComponent implements OnInit {
	public user = null;
	@Input() squad: Squad;
	@Input() public: boolean = false;
	@Input() noButtons: boolean = false;
	@Output() reload: EventEmitter<any> = new EventEmitter();
	constructor(private http: HttpClient, private auth: AuthService) {}

	ngOnInit(): void {
		this.auth.details$.subscribe((user) => {
			this.user = user;
		});
	}

	findRemark(squad: Squad) {
		return this.findSquadMember(squad).remark;
	}

	findSquadMember(squad: Squad) {
		return squad.squadMembers.filter((squadMember) => squadMember.steamId === this.user.steamId)[0];
	}

	copyLink(squad: Squad) {
		navigator.clipboard.writeText(squad.squadXmlLink);
	}

	leaveSquad(squad: Squad) {
		this.http.delete('/SquadMember/' + this.findSquadMember(squad).squadMemberId).subscribe((res) => {
			this.reload.emit();
		});
	}
}
