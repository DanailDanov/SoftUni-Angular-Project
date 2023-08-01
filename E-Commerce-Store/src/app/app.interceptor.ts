import { HTTP_INTERCEPTORS, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Provider } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";

const { apiUrl } = environment;

@Injectable()

export class CookieInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (req.url.startsWith('/api')) {
            req = req.clone({
                url: req.url.replace('/api', apiUrl),
                withCredentials: true,
            })
        }

        return next.handle(req);
    }
}

export const CookieInterceptorProvider: Provider = {
    multi: true,
    useClass: CookieInterceptor,
    provide: HTTP_INTERCEPTORS,
};
