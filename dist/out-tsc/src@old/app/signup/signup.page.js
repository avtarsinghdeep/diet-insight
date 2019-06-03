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
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Platform, LoadingController } from '@ionic/angular';
import { country_code } from '../country_code';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
var SignupPage = /** @class */ (function () {
    function SignupPage(loadCtrl, platform, navCtrl, formBuilder, loadingService, apiService, dataService, alertService, device, fcm) {
        this.loadCtrl = loadCtrl;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.device = device;
        this.fcm = fcm;
        this.c_code = [];
        this.user = {
            firstName: null,
            lastName: null,
            email: null,
            country_code: null,
            phoneNo: null,
            password: null,
            confirmPassword: null
        };
        this.customOptions = {
            header: 'Country code'
        };
        this.dataService.pageType == '';
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        var phoneRegex = /^(?:(?:\(?(?:00|\+)([1-4]\d\d|[1-9]\d?)\)?)?[\-\.\ \\\/]?)?((?:\(?\d{1,}\)?[\-\.\ \\\/]?){0,})(?:[\-\.\ \\\/]?(?:#|ext\.?|extension|x)[\-\.\ \\\/]?(\d+))?$/i;
        this.signup_form = formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(25), Validators.minLength(3)])],
            lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(25), Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            country_code: ['', Validators.compose([Validators.required])],
            phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3), Validators.pattern(phoneRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])]
        });
        this.signup_form.controls.country_code.setValue('+91');
        this.user.country_code = '+91';
    }
    SignupPage.prototype.ionViewDidLoad = function () { };
    SignupPage.prototype.login = function () {
        this.navCtrl.navigateForward('login');
    };
    SignupPage.prototype.ionViewDidEnter = function () { };
    SignupPage.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            console.log('loaded');
            _this.c_code = country_code;
            console.log(_this.c_code);
            _this.checkFlag();
        }, 1000);
        if (this.platform.is('cordova')) {
            console.log('Device UUID is: ' + this.device.uuid);
            this.device_id = this.device.uuid;
            this.fcm.getToken().then(function (token) {
                console.log(token);
                _this.device_token = token;
            });
        }
        else {
            this.device_id = 'dsdsdsds';
            this.device_token = 'dsdddsfsdsds';
        }
    };
    SignupPage.prototype.checkFlag = function () {
        var _this = this;
        this.flag = this.c_code.filter(function (a) {
            return _this.signup_form.value.country_code == a.dial_code;
        })[0].img;
    };
    SignupPage.prototype.sort = function () {
        return this.c_code.sort(function (a, b) {
            return a.dial_code - b.dial_code;
        });
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        console.log(this.signup_form.value);
        if (this.signup_form.value.confirmPassword != this.signup_form.value.password) {
            this.alertService.presentAlert('Alert', "Password doesn't match");
        }
        else if (this.signup_form.valid) {
            var data = {
                firstname: this.user.firstName,
                lastname: this.user.lastName,
                email: this.user.email,
                mobile: this.user.phoneNo,
                country_code: this.user.country_code,
                password: this.user.password,
                device_id: this.device_id,
                device_token: this.device_token
            };
            this.loadingService.present();
            this.apiService.register(data).subscribe(function (data) {
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
            this.alertService.presentAlert('Alert', 'Please fill all the details');
        }
    };
    SignupPage = __decorate([
        Component({
            selector: 'app-signup',
            templateUrl: './signup.page.html',
            styleUrls: ['./signup.page.scss'],
        }),
        __metadata("design:paramtypes", [LoadingController,
            Platform,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            DataService,
            AlertService, Device, FCM])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map