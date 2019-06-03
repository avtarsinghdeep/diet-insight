var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, HostListener } from '@angular/core';
import { ApiService, LoadingService, AlertService } from '../shared/index';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
var ForgotOtpPage = /** @class */ (function () {
    function ForgotOtpPage(platform, activatedRoute, navCtrl, formBuilder, loadingService, apiService, alertService) {
        var _this = this;
        this.platform = platform;
        this.activatedRoute = activatedRoute;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.alertService = alertService;
        this.submit = true;
        this.otp = '';
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.forgot_form = formBuilder.group({
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.required])]
        });
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.email = params.email;
            _this.phoneNo = params.phoneNo;
        });
        // this.email=this.navParams.get('email');
    }
    ForgotOtpPage.prototype.handleDeleteKeyboardEvent = function (event) {
        if (event.key === 'Backspace') {
            if (document.activeElement.id == 'otp1') { }
            else if (document.activeElement.id == 'otp2') {
                this.otp1.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp3') {
                this.otp2.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp4') {
                this.otp3.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp5') {
                this.otp4.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp6') {
                this.otp5.nativeElement.focus();
            }
        }
        else if (event.key) {
            if (document.activeElement.id == 'otp1') {
                this.otp2.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp2') {
                this.otp3.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp3') {
                this.otp4.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp4') {
                this.otp5.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp5') {
                this.otp6.nativeElement.focus();
            }
            else if (document.activeElement.id == 'otp6') {
                this.otp6.nativeElement.blur();
                this.updateotp();
            }
        }
    };
    ForgotOtpPage.prototype.ngOnInit = function () { };
    ForgotOtpPage.prototype.setFocus = function (index) {
        console.log('index value is', index);
        switch (index) {
            case 0:
                this.otp1.setFocus();
                break;
            case 1:
                this.otp2.setFocus();
                break;
            case 2:
                this.otp3.setFocus();
                break;
            case 3:
                this.otp4.setFocus();
                break;
            case 4:
                this.otp5.setFocus();
                break;
            case 5:
                this.otp6.setFocus();
                break;
        }
    };
    ForgotOtpPage.prototype.updateList = function (event, maxlength) {
        console.log('KEY PRESSED', event.key);
        if (event.key === 'Backspace') {
            if (maxlength == '1') { }
            else if (maxlength == '2') {
                this.otp1.setFocus();
            }
            else if (maxlength == '3') {
                this.otp2.setFocus();
            }
            else if (maxlength == '4') {
                this.otp3.setFocus();
            }
            else if (maxlength == '5') {
                this.otp4.setFocus();
            }
            else if (maxlength == '6') {
                this.otp5.setFocus();
            }
        }
        else {
            this.setFocus(maxlength);
        }
    };
    ForgotOtpPage.prototype.signup = function () { this.navCtrl.navigateForward('signup'); };
    ForgotOtpPage.prototype.updateotp = function () {
        this.otp = this.otp1.value +
            this.otp2.value +
            this.otp3.value +
            this.otp4.value +
            this.otp5.value +
            this.otp6.value;
    };
    ForgotOtpPage.prototype.forgot = function () {
        var _this = this;
        this.updateotp();
        this.submit = false;
        if (this.forgot_form.value.confirmPassword != this.forgot_form.value.password) {
            this.alertService.presentAlert('Alert', "Password doesn't match");
        }
        else if (this.forgot_form.valid && this.otp.length == 6) {
            var data = {
                email: this.email ? this.email : this.phoneNo,
                otp: this.otp,
                password: this.forgot_form.value.password
            };
            this.loadingService.present();
            this.apiService.change_password(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == '200') {
                    _this.alertService.presentAlert('Alert', 'Password reset successful');
                    _this.navCtrl.navigateRoot('login');
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                _this.loadingService.dismiss();
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please enter valid credentials');
        }
    };
    __decorate([
        ViewChild('otp1'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp1", void 0);
    __decorate([
        ViewChild('otp2'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp2", void 0);
    __decorate([
        ViewChild('otp3'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp3", void 0);
    __decorate([
        ViewChild('otp4'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp4", void 0);
    __decorate([
        ViewChild('otp5'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp5", void 0);
    __decorate([
        ViewChild('otp6'),
        __metadata("design:type", Object)
    ], ForgotOtpPage.prototype, "otp6", void 0);
    __decorate([
        HostListener('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], ForgotOtpPage.prototype, "handleDeleteKeyboardEvent", null);
    ForgotOtpPage = __decorate([
        Component({
            selector: 'app-forgot-otp',
            templateUrl: './forgot-otp.page.html',
            styleUrls: ['./forgot-otp.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            ActivatedRoute,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            AlertService])
    ], ForgotOtpPage);
    return ForgotOtpPage;
}());
export { ForgotOtpPage };
//# sourceMappingURL=forgot-otp.page.js.map