var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { Validators, FormBuilder } from '@angular/forms';
import { NavController, Platform, PopoverController } from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { CountryCodeComponent } from '../country-code/country-code.component';
import { environment } from '../../environments/environment';
var LoginPage = /** @class */ (function () {
    function LoginPage(googlePlus, platform, fb, navCtrl, formBuilder, loadingService, apiService, dataService, popoverController, alertService, device, fcm) {
        this.googlePlus = googlePlus;
        this.platform = platform;
        this.fb = fb;
        this.navCtrl = navCtrl;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.dataService = dataService;
        this.popoverController = popoverController;
        this.alertService = alertService;
        this.device = device;
        this.fcm = fcm;
        this.Login_with = "1";
        this.zero = false;
        this.user = {};
        // let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[0-9]{10,12}$/;
        var emailRegex = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
        var phoneValidation = /^[1-9a-zA-Z][0-9a-zA-Z]*$/;
        this.login_form = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
        });
        this.login_form1 = formBuilder.group({
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
            phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.pattern(phoneValidation)])]
        });
        this.dataService.pageType == '';
        this.user.country_code = '+91';
        this.img = environment.apiUrl + '/flags/in.svg';
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
        if (this.Login_with == "1") {
            if (this.login_form.valid) {
                console.log('email is', this.login_form.controls.email.valid);
                console.log('wrong.....ELSE');
                var data = {
                    login_type: 'form',
                    email: this.login_form.value.email,
                    password: this.login_form.value.password,
                    device_id: this.device_id,
                    device_token: this.device_token
                    // }
                };
                this.loadingService.present();
                this.apiService.login(data).subscribe(function (data) {
                    if (data.status_code == 200) {
                        localStorage['userDetail'] = JSON.stringify(data.result);
                        localStorage['isLoggedIn'] = true;
                        console.log('USER DATA', _this.dataService.userData);
                        _this.dataService.userData = data.result;
                        console.log('USER DATA=====', data.result);
                        localStorage['profile_img'] = _this.dataService.userData.profile_image;
                        localStorage['login_type'] = 'form';
                        _this.loadingService.dismiss();
                        _this.alertService.presentAlert('Alert', 'Login Successful..');
                        _this.navCtrl.navigateRoot('tabs');
                        // this.navCtrl.navigateRoot('personal-profile');
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
        }
        else if (this.Login_with == "2") {
            if (this.login_form1.valid) {
                console.log('phonenumber is', this.login_form1.controls.phoneNo.valid);
                console.log('wrong.....ELSE');
                var data = {
                    login_type: 'form',
                    email: this.login_form1.value.phoneNo,
                    password: this.login_form1.value.password,
                    device_id: this.device_id,
                    device_token: this.device_token
                    // }
                };
                this.loadingService.present();
                this.apiService.login(data).subscribe(function (data) {
                    if (data.status_code == 200) {
                        localStorage['userDetail'] = JSON.stringify(data.result);
                        localStorage['isLoggedIn'] = true;
                        _this.dataService.userData = data.result;
                        localStorage['profile_img'] = _this.dataService.userData.profile_image;
                        localStorage['login_type'] = 'form';
                        _this.loadingService.dismiss();
                        _this.alertService.presentAlert('Alert', 'Login Successful..');
                        _this.navCtrl.navigateRoot('tabs');
                        // this.navCtrl.navigateRoot('personal-profile');
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
                //console.log('USER Facebook birth date', user.birthday);
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
                localStorage['login_type'] = 'social';
                localStorage['fb_birthday'] = user.birthday;
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
                localStorage['login_type'] = 'social';
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
    LoginPage.prototype.SelectCountryCode = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log('codes');
                        return [4 /*yield*/, this.popoverController.create({
                                component: CountryCodeComponent,
                                componentProps: {
                                    codes: this.c_code
                                },
                                cssClass: 'custom-popover'
                            })];
                    case 1:
                        alert = _a.sent();
                        alert.onDidDismiss().then(function (data) {
                            console.log("codeeee after", data);
                            _this.state_selected = data;
                            _this.img = _this.state_selected.data.code_image;
                            _this.dial_code = _this.state_selected.data.dial_code;
                            _this.user.country_code = _this.state_selected.data.dial_code;
                            // this.signup_form.controls.country_code.setValue(this.state_selected.data.dial_code);
                        });
                        return [4 /*yield*/, alert.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    LoginPage.prototype.checkFlag = function () {
        var _this = this;
        this.flag = this.c_code.filter(function (a) {
            // return this.signup_form.value.country_code == a.dial_code
            return _this.user.country_code == a.dial_code;
        })[0].img;
    };
    LoginPage.prototype.sort = function () {
        return this.c_code.sort(function (a, b) {
            return a.dial_code - b.dial_code;
        });
    };
    LoginPage.prototype.onInput = function (event) {
        if (event.length > 0) {
            console.log("ev", event, event.length);
            console.log(event.charAt(0));
            if (event.charAt(0) == 0 || event.charAt(0) == '0') {
                this.zero = true;
            }
            else {
                this.zero = false;
            }
        }
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
            PopoverController,
            AlertService, Device, FCM])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.page.js.map