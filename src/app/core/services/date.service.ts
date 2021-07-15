import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

@Injectable({
	providedIn: 'root',
})
export class DateService {
	constructor() {
		const relativeTime = require('dayjs/plugin/relativeTime');
		dayjs.extend(relativeTime);
	}
	public fromNow(date: string) {
		// @ts-ignore
		return dayjs(date).fromNow();
	}
}
