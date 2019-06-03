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
var SignupPage = /** @class */ (function () {
    function SignupPage(loadCtrl, platform, navCtrl, formBuilder, loadingService, apiService, dataService, alertService) {
        this.loadCtrl = loadCtrl;
        this.platform = platform;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.user = { firstName: null, lastName: null, email: null, phoneNo: null, password: null, confirmPassword: null };
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.signup_form = formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(25), Validators.minLength(3)])],
            lastName: ['', Validators.compose([Validators.required, Validators.pattern('[a-zA-Z]*'), Validators.maxLength(25), Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(25), Validators.minLength(3)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])]
        });
    }
    SignupPage.prototype.login = function () { this.navCtrl.navigateForward('login'); };
    SignupPage.prototype.ionViewDidEnter = function () { };
    SignupPage.prototype.ngOnInit = function () { };
    SignupPage.prototype.signup = function () {
        var _this = this;
        console.log(this.signup_form.value);
        if (this.signup_form.value.confirmPassword != this.signup_form.value.password) {
            this.alertService.presentAlert('Alert', "Password doesn't match");
        }
        else if (this.signup_form.valid) {
            if (this.platform.is('cordova')) {
                var data = {
                    firstname: this.user.firstName,
                    lastname: this.user.lastName,
                    email: this.user.email,
                    mobile: this.user.phoneNo,
                    password: this.user.password,
                    device_id: 'dsdsdsds',
                    device_token: 'dsdddsfsdsds'
                };
            }
            else {
                var data = {
                    firstname: this.user.firstName,
                    lastname: this.user.lastName,
                    email: this.user.email,
                    mobile: this.user.phoneNo,
                    password: this.user.password,
                    device_id: 'dsdsdsds',
                    device_token: 'dsdddsfsdsds'
                };
            }
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
            AlertService])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map