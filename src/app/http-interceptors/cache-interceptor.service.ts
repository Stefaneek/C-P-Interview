import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from '../../environments/environment';
import { RequestCacheService } from './request-cache.service';

const cacheTime = environment.cacheTime;;

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    headers: HttpHeaders = new HttpHeaders({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'x-api-key': environment.xApiKey,
    });

    constructor(private cache: RequestCacheService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const cachedResponse = this.cache.get(req.url);
        return cachedResponse
            ? of(cachedResponse)
            : this.sendRequest(req, next);
    }

    sendRequest(req: HttpRequest<any>,next: HttpHandler): Observable<HttpEvent<any>> {
        const authReq = req.clone({
            headers: this.headers
        });
        
        return next.handle(authReq).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.set(req.url, event, cacheTime);
                }
              })
        );
    }
}