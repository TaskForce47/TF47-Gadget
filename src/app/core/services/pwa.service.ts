import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { MessageService } from 'primeng/api';
import { delay } from 'rxjs/operators';
import { of } from 'rxjs';
@Injectable()
export class PwaService {
	constructor(private swUpdate: SwUpdate, private message: MessageService) {
		swUpdate.available.subscribe((event) => {
			if (event.available) {
				this.message.add({
					sticky: true,
					closable: false,
					severity: 'info',
					summary: 'Update available Site reloading',
				});
				of(null)
					.pipe(delay(5000))
					.subscribe(() => {
						swUpdate.activateUpdate().then(() => document.location.reload());
					});
			}
		});
	}
}
