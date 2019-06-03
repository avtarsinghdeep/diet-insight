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
var ForgotPage = /** @class */ (function () {
    function ForgotPage(platform, router, navCtrl, formBuilder, loadingService, apiService, alertService) {
        this.platform = platform;
        this.router = router;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.alertService = alertService;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.forgot_form = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])]
        });
    }
    ForgotPage.prototype.ngOnInit = function () {
    };
    ForgotPage.prototype.signup = function () { this.navCtrl.navigateForward('signup'); };
    ForgotPage.prototype.forgot = function () {
        var _this = this;
        if (this.forgot_form.valid) {
            var data = { email: this.forgot_form.value.email };
            this.loadingService.present();
            this.apiService.forget_password(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    var navigationExtras = {
                        queryParams: {
                            email: _this.forgot_form.value.email,
                            otp: data.result.otp
                        }
                    };
                    console.log(navigationExtras);
                    _this.router.navigate(['forgot-otp'], navigationExtras);
                    // this.navCtrl.navigateForward('forgot-otp',navigationExtras);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Please enter valid credentials');
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please enter valid credentials');
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