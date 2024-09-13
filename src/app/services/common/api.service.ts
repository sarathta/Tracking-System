import {
    HttpErrorResponse,
    HttpEvent,
    HttpHandler,
    HttpHeaders,
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable()
export class HttpInterceptorService implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //TODO: loading screen start action

        let headers: HttpHeaders = req.headers;
        headers = headers.set('Content-Type', 'application/json');

        // if (req.body && req.body?.append) {
        //     console.log(req.body)
        //     headers = new HttpHeaders;
        // }

        const authReq = req.clone({ headers, url: req.url });

        return next.handle(authReq).pipe(
            map((event: HttpEvent<HttpResponse<any>>) => {
                return event;
            }),
            catchError((error: HttpErrorResponse) => {
                if (error.error instanceof ErrorEvent) {
                    console.log(error.error.message);
                }
                // if (error.status == 403) {
                //     localStorage.clear();
                //     sessionStorage.clear();

                //     // this.router.navigateByUrl('/login');
                //     //TODO: logout or session expiry logic/action;
                // }

                return throwError(() => error);
            })
        );
    }
}
