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
import { NavController, Platform } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
var LoginPage = /** @class */ (function () {
    function LoginPage(googlePlus, platform, fb, navCtrl, formBuilder, loadingService, apiService, dataService, alertService, device, fcm) {
        this.googlePlus = googlePlus;
        this.platform = platform;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.device = device;
        this.fcm = fcm;
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[0-9]{10,12}$/;
        this.login_form = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])]
        });
        this.dataService.pageType == '';
    }
    LoginPage.prototype.signUp = function () {
        this.navCtrl.navigateForward('signup');
    };
    LoginPage.prototype.forgot = function () {
        this.navCtrl.navigateForward('forgot');
    };
    LoginPage.prototype.ngOnInit = function () {
        var _this = this;
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
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.login_form.valid) {
            var data = {
                login_type: 'form',
                email: this.login_form.value.email,
                password: this.login_form.value.password,
                device_id: this.device_id,
                device_token: this.device_token
            };
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
                _this.alertService.presentAlert('Alert', err);
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please enter valid credentials');
        }
    };
    LoginPage.prototype.fb_login = function () {
        var _this = this;
        var permissions = new Array();
        permissions = ["public_profile", "email"];
        this.fb.login(permissions).then(function (response) {
            var userId = response.authResponse.userID;
            var params = new Array();
            _this.fb.api("/me?fields=name,gender,email,id,first_name,last_name", params)
                .then(function (user) {
                user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
                _this.facebook(user);
            });
        }, function (error) {
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    LoginPage.prototype.facebook = function (user) {
        var _this = this;
        var data = {
            login_type: 'social',
            email: user.email,
            socialID: user.id,
            firstname: user.first_name,
            lastname: user.last_name,
            device_id: this.device_id,
            device_token: this.device_token
        };
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
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', err);
        });
    };
    LoginPage.prototype.gmail_login = function () {
        var _this = this;
        this.googlePlus.login({}).then(function (res) {
            _this.googlelogin(res);
        }).catch(function (err) {
            console.log(err);
            _this.alertService.presentAlert('Something went wrong', 'please try again later');
        });
        console.log('gmail');
    };
    LoginPage.prototype.googlelogin = function (user) {
        var _this = this;
        var name = user.displayName.split(" ");
        var data = {
            login_type: 'social',
            email: user.email,
            socialID: user.userId,
            firstname: name[0],
            lastname: name[1],
            device_id: this.device_id,
            device_token: this.device_token
        };
        this.loadingService.present();
        this.apiService.login(data).subscribe(function (data) {
            if (data.status_code == 200) {
                localStorage['userDetail'] = JSON.stringify(data.result);
                localStorage['isLoggedIn'] = true;
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert1', 'Login Successful..');
                _this.navCtrl.navigateRoot('tabs');
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert2', data.result);
            }
        }, function (err) {
            console.log(err);
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', err);
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'app-login',
            templateUrl: './login.page.html',
            styleUrls: ['./login.page.scss'],
        }),
        __metadata("design:paramtypes", [GooglePlus,
            Platform,
            Facebook,
            NavController,
            FormBuilder,
            LoadingService,
            ApiService,
            DataService,
            AlertService, Device, FCM])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map