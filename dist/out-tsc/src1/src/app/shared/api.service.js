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
        return this.http.post(environment.apiUrl + '/register', data, httpOptions);
    };
    ApiService.prototype.login = function (data) {
        return this.http.post(environment.apiUrl + '/login', data, httpOptions);
    };
    ApiService.prototype.forget_password = function (data) {
        return this.http.post(environment.apiUrl + '/forget_password', data, httpOptions);
    };
    ApiService.prototype.change_password = function (data) {
        return this.http.post(environment.apiUrl + '/change_password', data, httpOptions);
    };
    ApiService.prototype.services_list = function () {
        return this.http.get(environment.apiUrl + '/services_list', httpOptions);
    };
    ApiService.prototype.countries = function () {
        return this.http.get(environment.apiUrl + '/countries', httpOptions);
    };
    ApiService.prototype.stateList = function (data) {
        return this.http.post(environment.apiUrl + '/stateList', data, httpOptions);
    };
    ApiService.prototype.cityList = function (data) {
        return this.http.post(environment.apiUrl + '/cityList', data, httpOptions);
    };
    ApiService.prototype.personal_profile = function (data) {
        return this.http.post(environment.apiUrl + '/personal_profile', data, httpOptions);
    };
    ApiService.prototype.recipe_list = function () {
        return this.http.get(environment.apiUrl + '/recipes_list', httpOptions);
    };
    ApiService.prototype.buy_package = function (data) {
        return this.http.post(environment.apiUrl + '/buy_package', data, httpOptions);
    };
    ApiService.prototype.userPackage = function (data) {
        return this.http.post(environment.apiUrl + '/my_package', data, httpOptions);
    };
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