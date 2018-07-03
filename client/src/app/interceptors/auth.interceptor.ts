import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private router: Router) {

    }
    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (req.url.indexOf('login') > -1) {
            return next.handle(req);
        }
        if (localStorage.getItem('access_token')) {
            req = req.clone({
                setHeaders: {
                    Authorization: localStorage.getItem('access_token')
                }
            });
            return next.handle(req);
        } else {
            this.router.navigate(['login']);
        }
    }
}
