import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		const apiReq = req.clone({ url: `https://api.taskforce47.com/api${req.url}`, withCredentials: true });
		return next.handle(apiReq);
	}
}
