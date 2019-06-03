import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertService } from './shared/alert.service'
@Injectable()
export class InternetInterceptor implements HttpInterceptor {
    constructor(public alertService:AlertService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // check to see if there's internet
        // if (!window.navigator.onLine) {
            // if there is no internet, throw a HttpErrorResponse error
            // since an error is thrown, the function will terminate here
            // this.alertService.presentAlert('Alert','Internet is required');
            // return "Internet is required";
            // return Observable.throw(new HttpErrorResponse({ error: 'Internet is required.' }));
        // } else {
            // else return the normal request
            return next.handle(request);
        // }
    }
}