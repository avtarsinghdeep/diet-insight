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
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../environments/environment';
var httpOptions = {
    headers: new HttpHeaders({
    // 'Content-Type':  'application/json',
    // 'Content-Type':  'application/x-www-form-urlencoded',
    // 'Accept':'application/json, text/plain, */*',
    // // 'Authorization': 'my-auth-token'
    // 'Access-Control-Allow-Headers': 'x-same-domain',
    // 'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
    // 'Access-Control-Allow-Origin': '*',
    // 'Allow': 'POST, GET, OPTIONS, PUT, DELETE'
    })
};
var ApiService = /** @class */ (function () {
    function ApiService(http) {
        this.http = http;
    }
    ApiService.prototype.register = function (data) {
        return this.http.post(environment.apiUrl + '/register', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.login = function (data) {
        return this.http.post(environment.apiUrl + '/login', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.forget_password = function (data) {
        return this.http.post(environment.apiUrl + '/forget_password', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.change_password = function (data) {
        return this.http.post(environment.apiUrl + '/change_password', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.services_list = function () {
        return this.http.get(environment.apiUrl + '/services_list', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.recipe_list = function () {
        return this.http.get(environment.apiUrl + '/recipes_list', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.buy_package = function (data) {
        return this.http.post(environment.apiUrl + '/buy_package', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.countries = function () {
        return this.http.get(environment.apiUrl + '/countries', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.stateList = function (data) {
        return this.http.post(environment.apiUrl + '/stateList', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.cityList = function (data) {
        return this.http.post(environment.apiUrl + '/cityList', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.personal_profile = function (data) {
        return this.http.post(environment.apiUrl + '/personal_profile', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.medical_problems_list = function () {
        return this.http.get(environment.apiUrl + '/medical_problems_list', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.medical_profile = function (data) {
        return this.http.post(environment.apiUrl + '/medical_profile', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.userPackage = function (data) {
        return this.http.post(environment.apiUrl + '/my_package', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.chatlist = function (data) {
        return this.http.post(environment.apiUrl + '/message_list', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.adminchat = function (data) {
        return this.http.post(environment.apiUrl + '/send_message', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.appointment_list = function (data) {
        return this.http.post(environment.apiUrl + '/appointment_list', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.save_payment_method = function (data) {
        return this.http.post(environment.apiUrl + '/save_payment_method', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.testimonial_list = function () {
        return this.http.get(environment.apiUrl + '/testimonials', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.filesend = function (data) {
        return this.http.post(environment.apiUrl + '/send_attachment', data)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.packageupdate = function (data) {
        return this.http.post(environment.apiUrl + '/package_update', data)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.upgradePackage = function (data) {
        return this.http.post(environment.apiUrl + '/upgrade_package', data)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.appointment_reschedule_request = function (data) {
        return this.http.post(environment.apiUrl + '/appointment_reschedule_request', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.fooditems = function () {
        return this.http.get(environment.apiUrl + '/food_items', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.add_user_meal = function (data) {
        return this.http.post(environment.apiUrl + '/add_user_meal', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.user_daily_meals = function (data) {
        return this.http.post(environment.apiUrl + '/user_daily_meals', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.add_user_weight = function (data) {
        return this.http.post(environment.apiUrl + '/add_user_weight', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.user_weight_history = function (data) {
        return this.http.post(environment.apiUrl + '/user_weight_history', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.add_water_intake = function (data) {
        return this.http.post(environment.apiUrl + '/add_water_intake', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.water_intake_history = function (data) {
        return this.http.post(environment.apiUrl + '/water_intake_history', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.time_slots = function () {
        return this.http.get(environment.apiUrl + '/time_slots', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.dashboard = function (data) {
        return this.http.post(environment.apiUrl + '/dashboard', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.faq_list = function () {
        return this.http.get(environment.apiUrl + '/faqs', httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.dietplan_list = function (data) {
        return this.http.post(environment.apiUrl + '/dietcharts', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.notification_list = function (data) {
        return this.http.post(environment.apiUrl + '/user_notification_list', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.onBreak = function (data) {
        return this.http.post(environment.apiUrl + '/add_user_break', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.getPaytmTransactionId = function (data) {
        return this.http.post(environment.apiUrl + '/getPaytmTransactionId', data, httpOptions);
    };
    ApiService.prototype.sendRegisterOtp = function (data) {
        return this.http.post(environment.apiUrl + '/sendRegisterOtp', data, httpOptions);
    };
    ApiService.prototype.notification_clearlist = function (data) {
        return this.http.post(environment.apiUrl + '/user_notification_list_clear', data, httpOptions)
            .pipe(catchError(this.handleError));
    };
    ApiService.prototype.getsocketMessage = function (data) {
        return this.http.post(environment.socketApi + '/api/getsocketMessage', data, httpOptions);
    };
    ApiService.prototype.getFiles = function (data) {
        return this.http.post(environment.socketApi + '/api/getFiles', data, httpOptions);
    };
    ApiService.prototype.notification_settings = function (data) {
        return this.http.post(environment.apiUrl + '/notificationSettings', data, httpOptions);
    };
    // getpayResponse(data) : Observable <any>{
    // return this.http.get(data)
    // .pipe(catchError(this.handleError));
    // }
    ApiService.prototype.handleError = function (error) {
        if (error.error instanceof ErrorEvent) {
            return throwError('An error occurred:' + error.error.message);
        }
        else if (!window.navigator.onLine) {
            return throwError('Internet is required');
            console.error("Backend returned code " + error.status + ", " + ("body was: " + error.error));
        }
        return throwError('Something went wrong...');
    };
    ;
    ApiService = __decorate([
        Injectable({
            providedIn: 'root'
        }),
        __metadata("design:paramtypes", [HttpClient])
    ], ApiService);
    return ApiService;
}());
export { ApiService };
//# sourceMappingURL=api.service.js.map