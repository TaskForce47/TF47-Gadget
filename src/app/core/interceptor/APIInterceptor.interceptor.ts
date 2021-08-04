import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
@Injectable()
export class APIInterceptor implements HttpInterceptor {
	constructor(private notification: MessageService, private router: Router, private activatedRoute: ActivatedRoute) {}
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (req.url.indexOf('https') === -1) {
			const apiReq = req.clone({ url: `https://moin.taskforce47.com:5001/api${req.url}` });
			return next.handle(apiReq).pipe(
				// @ts-ignore
				catchError((error: HttpErrorResponse) => {
					switch (error.status) {
						case 0:
							this.notification.add({
								severity: 'error',
								summary: 'Request failed',
								detail: 'Server did not respond',
							});
							break;
						case 400:
							this.router.navigate(['..'], {
								relativeTo: this.activatedRoute,
							});
							this.notification.add({
								severity: 'error',
								summary: 'Request failed',
								detail: 'The Resource with the specified ID was not found',
							});
							break;
					}
					return throwError(error);
				})
			);
		}
		return next.handle(req);
	}
}
