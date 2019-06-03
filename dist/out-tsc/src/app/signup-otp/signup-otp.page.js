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
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
var SignupOtpPage = /** @class */ (function () {
    function SignupOtpPage(platform, activatedRoute, navCtrl, formBuilder, loadingService, apiService, alertService, dataService) {
        var _this = this;
        this.platform = platform;
        this.activatedRoute = activatedRoute;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.alertService = alertService;
        this.dataService = dataService;
        this.submit = true;
        this.otp = '';
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.forgot_form = formBuilder.group({
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])]
        });
        this.activatedRoute.queryParams.subscribe(function (params) {
            _this.email = params.email;
        });
    }
    SignupOtpPage.prototype.handleDeleteKeyboardEvent = function (event) {
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
    SignupOtpPage.prototype.ngOnInit = function () { };
    SignupOtpPage.prototype.setFocus = function (index) {
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
    SignupOtpPage.prototype.updateList = function (event, maxlength) {
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
    SignupOtpPage.prototype.signup = function () { this.navCtrl.navigateForward('signup'); };
    SignupOtpPage.prototype.updateotp = function () {
        this.otp = this.otp1.value +
            this.otp2.value +
            this.otp3.value +
            this.otp4.value +
            this.otp5.value +
            this.otp6.value;
    };
    SignupOtpPage.prototype.onSend = function () {
        var _this = this;
        this.updateotp();
        this.submit = false;
        console.log(this.dataService.signupDATA);
        console.log(this.dataService.otpValue);
        console.log("length", this.otp);
        if (this.otp.length >= 5) {
            if (this.otp == this.dataService.otpValue) {
                this.loadingService.present();
                this.apiService.register(this.dataService.signupDATA).subscribe(function (data) {
                    if (data.status_code == 200) {
                        _this.loadingService.dismiss();
                        _this.navCtrl.navigateRoot('services');
                        _this.dataService.userData = data.result;
                        localStorage['userDetail'] = JSON.stringify(data.result);
                        localStorage['isLoggedIn'] = true;
                        _this.alertService.presentAlert('Alert', 'Signup Successful..');
                    }
                    else {
                        _this.loadingService.dismiss();
                        _this.alertService.presentAlert('Alert', data.result);
                    }
                }, function (err) {
                    _this.loadingService.dismiss();
                    _this.alertService.presentAlert('Alert', 'Something went wrong...');
                });
            }
            else {
                this.alertService.presentAlert('Alert', "OTP doesn't match");
            }
        }
        else {
        }
    };
    SignupOtpPage.prototype.onSendOtp = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.sendRegisterOtp({ mobile: this.dataService.signupDATA.mobile, type: 'signup', email: this.dataService.signupDATA.email }).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.dataService.otpValue = data.result.otp;
                _this.loadingService.dismiss();
                //  this.navCtrl.navigateRoot('signup-otp');
                _this.alertService.presentAlert('Alert', 'Verification code is sent to your mobile number.');
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    __decorate([
        ViewChild('otp1'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp1", void 0);
    __decorate([
        ViewChild('otp2'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp2", void 0);
    __decorate([
        ViewChild('otp3'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp3", void 0);
    __decorate([
        ViewChild('otp4'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp4", void 0);
    __decorate([
        ViewChild('otp5'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp5", void 0);
    __decorate([
        ViewChild('otp6'),
        __metadata("design:type", Object)
    ], SignupOtpPage.prototype, "otp6", void 0);
    __decorate([
        HostListener('document:keyup', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [KeyboardEvent]),
        __metadata("design:returntype", void 0)
    ], SignupOtpPage.prototype, "handleDeleteKeyboardEvent", null);
    SignupOtpPage = __decorate([
        Component({
            selector: 'app-signup-otp',
            templateUrl: './signup-otp.page.html',
            styleUrls: ['./signup-otp.page.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            ActivatedRoute,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            AlertService, DataService])
    ], SignupOtpPage);
    return SignupOtpPage;
}());
export { SignupOtpPage };
//# sourceMappingURL=signup-otp.page.js.map