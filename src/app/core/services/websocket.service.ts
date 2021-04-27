import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root',
})
export class WebsocketService {
	private websocketMap: Map<string, boolean> = new Map();
	constructor() {}

	public registerWebsocket(name) {
		this.websocketMap.set(name, false);
	}

	public updateWebsocket(name, value) {
		this.websocketMap.set(name, value);
	}

	public removeWebsocket(name) {
		this.websocketMap.delete(name);
	}

	public getWebsocketStatus(name) {
		return this.websocketMap.get(name);
	}

	public getWebsockets() {
		return this.websocketMap;
	}
}
