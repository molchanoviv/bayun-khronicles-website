import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class DataUrlInterceptor implements HttpInterceptor {

    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('https://') || req.url.startsWith('http://')) {
            return next.handle(req);
        }
        const apiReq = req.clone({ url: `${window.location.protocol}//${window.location.host}${req.url}` });

        return next.handle(apiReq);
    }
}
