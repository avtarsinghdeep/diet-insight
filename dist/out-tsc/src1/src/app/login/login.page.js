var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { ApiService, LoadingService, AlertService } from '../shared/index';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
var LoginPage = /** @class */ (function () {
    function LoginPage(platform, navCtrl, formBuilder, loadingService, apiService, alertService) {
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.alertService = alertService;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[0-9]{10,12}$/;
        this.login_form = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])]
        });
    }
    LoginPage.prototype.signUp = function () { this.navCtrl.navigateForward('signup'); };
    LoginPage.prototype.forgot = function () { this.navCtrl.navigateForward('forgot'); };
    LoginPage.prototype.ngOnInit = function () {
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.login_form.valid) {
            if (this.platform.is('cordova')) {
                var data = {
                    login_type: 'form',
                    email: this.login_form.value.email,
                    password: this.login_form.value.password,
                    device_id: 'sfsf',
                    device_token: 'sdfdsf'
                };
            }
            else {
                var data = {
                    login_type: 'form',
                    email: this.login_form.value.email,
                    password: this.login_form.value.password,
                    device_id: 'sfsf',
                    device_token: 'sdfdsf'
                };
            }
            this.loadingService.present();
            this.apiService.login(data).subscribe(function (data) {
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    localStorage['isLoggedIn'] = true;
                    _this.loadingService.dismiss();
                    _this.alertService.presentAlert('Alert', 'Login Successful..');
                    _this.navCtrl.navigateRoot('tabs');
                }
                else {
                    _this.loadingService.dismiss();
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                console.log(err);
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please enter valid credentials');
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            AlertService])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map