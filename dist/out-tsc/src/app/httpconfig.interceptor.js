var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { AlertService } from './shared/alert.service';
var InternetInterceptor = /** @class */ (function () {
    function InternetInterceptor(alertService) {
        this.alertService = alertService;
    }
    InternetInterceptor.prototype.intercept = function (request, next) {
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
    };
    InternetInterceptor = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AlertService])
    ], InternetInterceptor);
    return InternetInterceptor;
}());
export { InternetInterceptor };
//# sourceMappingURL=httpconfig.interceptor.js.map