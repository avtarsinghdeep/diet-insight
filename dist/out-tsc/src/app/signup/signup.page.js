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
import { NavController, Platform, LoadingController, PopoverController } from '@ionic/angular';
import { country_code } from '../country_code';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { CountryCodeComponent } from '../country-code/country-code.component';
import { environment } from '../../environments/environment';
var SignupPage = /** @class */ (function () {
    function SignupPage(loadCtrl, platform, navCtrl, formBuilder, loadingService, apiService, dataService, alertService, device, fcm, popoverController) {
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
        this.popoverController = popoverController;
        this.code = null;
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
        var name = /^[a-zA-Z0-9]+(?:[ _.-][a-z0-9]+)*$/;
        // let phoneValidation=/^\+?\d+$/
        var phoneValidation = /^[1-9a-zA-Z][0-9a-zA-Z]*$/;
        //let phoneRegex=/^(?:[1-9]\d*|0)$/;
        // '[a-zA-Z]* in first and last name'
        this.signup_form = formBuilder.group({
            firstName: ['', Validators.compose([Validators.required, Validators.pattern(name), Validators.maxLength(25), Validators.minLength(3)])],
            lastName: ['', Validators.compose([Validators.required, Validators.pattern(name), Validators.maxLength(25), Validators.minLength(3)])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            //country_code: ['', Validators.compose([Validators.required])],
            phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6), Validators.pattern(phoneValidation)])],
            password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
            confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.required])]
        });
        //this.signup_form.controls.country_code.setValue('+91');
        this.user.country_code = '+91';
        this.img = environment.apiUrl + '/flags/in.svg';
    }
    //   change(event){
    //    var num = event;
    // var digits = num.toString().split('');
    // var realDigits = digits.map(Number)
    // console.log(realDigits)
    // console.log(realDigits[0])
    //     if (event!=null) {
    //       if (event==0) {
    //       }
    //       else{
    //       }
    //     }
    //   }
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
            console.log("country code", _this.c_code);
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
            // return this.signup_form.value.country_code == a.dial_code
            return _this.user.country_code == a.dial_code;
        })[0].img;
    };
    SignupPage.prototype.sort = function () {
        return this.c_code.sort(function (a, b) {
            return a.dial_code - b.dial_code;
        });
    };
    SignupPage.prototype.signup = function () {
        var _this = this;
        console.log(this.user.country_code);
        console.log(this.signup_form);
        if (this.signup_form.value.confirmPassword != this.signup_form.value.password) {
            this.alertService.presentAlert('Alert', "Password doesn't match");
        }
        else if (this.signup_form.valid) {
            var datasign = {
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
            this.apiService.sendRegisterOtp({ country_code: this.user.country_code, mobile: this.user.phoneNo, type: 'signup', email: this.user.email }).subscribe(function (data) {
                if (data.status_code == 200) {
                    _this.dataService.signupDATA = datasign;
                    console.log('innn otp signup data', _this.dataService.signupDATA);
                    _this.dataService.otpValue = data.result.otp;
                    _this.loadingService.dismiss();
                    _this.navCtrl.navigateRoot('signup-otp');
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
        }
        else {
            this.alertService.presentAlert('Alert', 'Please fill all the details');
        }
    };
    SignupPage.prototype.SelectCountryCode = function () {
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
            AlertService, Device, FCM, PopoverController])
    ], SignupPage);
    return SignupPage;
}());
export { SignupPage };
//# sourceMappingURL=signup.page.js.map