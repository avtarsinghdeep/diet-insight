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
import { Router } from '@angular/router';
import { country_code } from '../country_code';
var ForgotPage = /** @class */ (function () {
    function ForgotPage(platform, router, navCtrl, formBuilder, loadingService, apiService, alertService) {
        this.platform = platform;
        this.router = router;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.alertService = alertService;
        this.c_code = [];
        this.customOptions = { header: 'Country code' };
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.forgot_form = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            country_code: ['', Validators.compose([Validators.required])],
            phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
        });
        this.forgot_form.controls.country_code.setValue('+91');
    }
    ForgotPage.prototype.ionViewDidLoad = function () {
    };
    ForgotPage.prototype.checkFlag = function () {
        var _this = this;
        console.log(this.forgot_form.value.country_code);
        this.flag = this.c_code.filter(function (a) { return _this.forgot_form.value.country_code == a.dial_code; })[0].img;
    };
    ForgotPage.prototype.sort = function () {
        return this.c_code.sort(function (a, b) { return a.dial_code - b.dial_code; });
    };
    ForgotPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            _this.c_code = country_code;
            _this.checkFlag();
        }, 1000);
    };
    ForgotPage.prototype.signup = function () { this.navCtrl.navigateForward('signup'); };
    ForgotPage.prototype.forgot = function () {
        var _this = this;
        if (this.forgot_form.controls.email.valid || this.forgot_form.controls.phoneNo.valid) {
            var data = this.forgot_form.value;
            this.loadingService.present();
            this.apiService.forget_password(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    var navigationExtras = {
                        queryParams: {
                            email: _this.forgot_form.value.email,
                            otp: data.result.otp,
                            phoneNo: _this.forgot_form.value.phoneNo
                        }
                    };
                    console.log(navigationExtras);
                    _this.router.navigate(['forgot-otp'], navigationExtras);
                    // this.navCtrl.navigateForward('forgot-otp',navigationExtras);
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Please enter valid credentials');
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please enter new password!');
        }
    };
    ForgotPage = __decorate([
        Component({
            selector: 'app-forgot',
            templateUrl: './forgot.page.html',
            styleUrls: ['./forgot.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            Router,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            AlertService])
    ], ForgotPage);
    return ForgotPage;
}());
export { ForgotPage };
//# sourceMappingURL=forgot.page.js.map