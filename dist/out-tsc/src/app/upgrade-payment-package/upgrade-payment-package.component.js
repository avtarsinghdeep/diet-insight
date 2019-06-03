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
import { NavController, ModalController, NavParams, PopoverController, Platform, AlertController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import * as sha512 from 'js-sha512';
import { environment } from '../../environments/environment';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
var UpgradePaymentPackageComponent = /** @class */ (function () {
    function UpgradePaymentPackageComponent(apiService, loadingService, dataService, navController, alertService, modalCtrl, navParams, iab, payPal, popoverController, platform, alertController) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.modalCtrl = modalCtrl;
        this.iab = iab;
        this.payPal = payPal;
        this.popoverController = popoverController;
        this.platform = platform;
        this.alertController = alertController;
        this.selected = null;
        this.payment_mode_save = true;
        this.payment_price = navParams.get('payment_price');
        this.payment_price_usd = navParams.get('payment_price_usd');
        this.service_id = navParams.get('service_id');
        this.variation_id = navParams.get('variation_id');
        console.log(this.dataService.userData.country_code, navParams.get('value'));
    }
    UpgradePaymentPackageComponent.prototype.ngOnInit = function () {
        this.entry = {};
        this.entry.isChecked = true;
        if (this.dataService.userData.payment_mode_save == true || this.dataService.userData.payment_mode_save == 'true') {
            if (this.dataService.userData.payment_mode == 'payu')
                this.selected = 0;
            if (this.dataService.userData.payment_mode == 'paypal')
                this.selected = 1;
            if (this.dataService.userData.payment_mode == 'paytm')
                this.selected = 2;
            if (this.dataService.userData.payment_mode == 'manual')
                this.selected = 3;
        }
        else {
        }
        ;
    };
    UpgradePaymentPackageComponent.prototype.presentAlertConfirm = function (selected, value) {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Are you sure want to continue?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        if (selected == 0) {
                                            _this.payubtn(value);
                                        }
                                        else if (selected == 1) {
                                            _this.paypalbtn(value);
                                        }
                                        else if (selected == 2) {
                                            _this.paytm(value);
                                        }
                                        else if (selected == 3) {
                                            _this.onDismiss(value);
                                        }
                                        console.log('Confirm Okay');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    UpgradePaymentPackageComponent.prototype.selectTab = function (index, value) {
        this.selected = index;
        this.payment_mode = value;
        this.presentAlertConfirm(index, value);
        // if (this.selected == 0) {
        //   this.payubtn(value)
        // } else if (this.selected == 1) {
        //   this.paypalbtn(value);
        // } else if (this.selected == 2) {
        //   this.paytm(value);
        // }
        // else if(this.selected==3){
        //   this.onDismiss(value)
        // }
        //this.savepaymentmethod(value)
    };
    UpgradePaymentPackageComponent.prototype.manual = function (value) {
    };
    UpgradePaymentPackageComponent.prototype.savepaymentmethod = function (value) {
        var _this = this;
        var data = {
            user_id: this.dataService.userData.id,
            payment_mode: value
        };
        console.log(data);
        this.apiService.save_payment_method(data).subscribe(function (data) {
            _this.dataService.userData.payment_mode = value;
            localStorage['userDetail'] = JSON.stringify(_this.dataService.userData);
        }, function (err) {
            console.log(err);
        });
    };
    UpgradePaymentPackageComponent.prototype.paypalbtn = function (value) {
        var _this = this;
        var amt = this.payment_price_usd.toString();
        this.payPal.init({
            PayPalEnvironmentProduction: 'AWYdrxIogNzW5kPT_jACliX9Gjnu40d5a-AjKSMS1P0YJcE59n5ecxLmbcds66VODPraspIilTeAYz-7',
            PayPalEnvironmentSandbox: 'ARWjYJw6bnEo8zZPP2_nuBK80w_49AKMPrSG5Uu24Q6AjFD7gCN-nU9a16mS74c4_niiNBvOicuOKpZF'
        }).then(function () {
            _this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(function () {
                var payment = new PayPalPayment(amt, 'USD', 'Description', 'sale');
                _this.payPal.renderSinglePaymentUI(payment).then(function (success) {
                    console.log("paypal response " + success);
                    if (success != null) {
                        console.log("transaction_id is:" + success.response.id);
                        _this.payment_id = success.response.id;
                        _this.savepaymentmethod(value);
                        _this.onDismiss(value);
                        //this.successCall(success);
                    }
                }, function () { });
            }, function () { });
        }, function () { });
    };
    UpgradePaymentPackageComponent.prototype.payubtn = function (value) {
        var _this = this;
        var name = this.dataService.userData.firstname;
        var mobile = this.dataService.userData.mobile;
        var email = this.dataService.userData.email;
        var d = new Date();
        var n = d.getTime();
        var bookingId = this.dataService.userData.id + "" + String(Math.floor(Math.random() * (99 - 10 + 1) + 10) + String(1235)) + "" + n;
        this.payment_id = bookingId;
        var productinfo = "Diet-insight Payment";
        var salt = environment.payULivesalt;
        var key = environment.payULivekey;
        var surl = environment.payUsurl;
        var furl = environment.payUfurl;
        var amt = this.payment_price;
        var service_provider = "payu_paisa";
        var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
        var encrypttext = sha512.sha512(string);
        var url = environment.payUApi + "payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&hash=" + encrypttext + "&salt=" + salt + "&key=" + key;
        console.log(url);
        console.log("bookingId", bookingId);
        console.log("name", name, "email", email, "mobile", mobile);
        console.log("duration_price_inr", this.payment_price);
        var browser = this.iab.create(url, '_blank');
        if (this.platform.is('android')) {
            browser.on('loadstop').subscribe(function (event) {
                console.log("event", event);
                if (event.url == environment.payUsurl) {
                    console.log('sucess');
                    browser.close();
                    _this.savepaymentmethod(value);
                    _this.onDismiss(value);
                }
                if (event.url == environment.payUfurl) {
                    console.log('failed');
                    browser.close();
                }
            });
        }
        else {
            browser.on('loadstart').subscribe(function (event) {
                console.log("event", event);
                if (event.url == environment.payUsurl) {
                    console.log('sucess');
                    browser.close();
                    _this.savepaymentmethod(value);
                    _this.onDismiss(value);
                }
                if (event.url == environment.payUfurl) {
                    console.log('failed');
                    browser.close();
                }
            });
        }
    };
    UpgradePaymentPackageComponent.prototype.paytm = function (value) {
        var _this = this;
        console.log("service_id", this.service_id);
        console.log("amt_us", this.payment_price_usd);
        console.log("var_id", this.variation_id);
        console.log("amt_inr", this.payment_price);
        var amt_us = this.payment_price_usd;
        var service_id = this.service_id;
        var var_id = this.variation_id;
        var amt_inr = this.payment_price;
        var user_id = this.dataService.userData.id;
        var browser = this.iab.create(environment.paytmApi + '/' + user_id + '/' + service_id + '/' + var_id + '/' + amt_inr + '/' + amt_us + '/' + 2, '_blank');
        if (this.platform.is('android')) {
            browser.on('loadstop').subscribe(function (event) {
                console.log("event", event);
                if (event.url == environment.paytmsfurl) {
                    console.log('sucess');
                    _this.apiService.getPaytmTransactionId({
                        user_id: user_id
                    })
                        .subscribe(function (data) {
                        var a = data.result;
                        if (data.status_code == 200) {
                            _this.payment_id = a.transaction_id;
                            _this.onDismiss(value);
                            // this.successCall(this.payment_id);
                            //  this.submit();
                            _this.savepaymentmethod(value);
                        }
                        else {
                            _this.alertService.presentAlert('Alert', 'Payment failed');
                        }
                        console.log("data", data);
                    }, function (err) {
                        console.log('Alert', 'err');
                    });
                    browser.close();
                }
            });
        }
        else {
            browser.on('loadstart').subscribe(function (event) {
                console.log("event", event);
                if (event.url == environment.paytmsfurl) {
                    console.log('sucess');
                    _this.apiService.getPaytmTransactionId({
                        user_id: user_id
                    })
                        .subscribe(function (data) {
                        var a = data.result;
                        if (data.status_code == 200) {
                            _this.payment_id = a.transaction_id;
                            _this.onDismiss(value);
                            _this.savepaymentmethod(value);
                        }
                        else {
                            _this.alertService.presentAlert('Alert', 'Payment failed');
                        }
                        console.log("data", data);
                    }, function (err) {
                        console.log('Alert', 'err');
                    });
                    browser.close();
                }
            });
        }
    };
    UpgradePaymentPackageComponent.prototype.onDismiss = function (value) {
        var data = {
            status: true,
            role: value,
            id: this.payment_id
        };
        this.modalCtrl.dismiss(data);
    };
    UpgradePaymentPackageComponent.prototype.ondismiss1 = function () {
        var data = {
            status: false,
        };
        this.modalCtrl.dismiss(data);
    };
    UpgradePaymentPackageComponent = __decorate([
        Component({
            selector: 'app-upgrade-payment-package',
            templateUrl: './upgrade-payment-package.component.html',
            styleUrls: ['./upgrade-payment-package.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService, ModalController, NavParams, InAppBrowser, PayPal, PopoverController, Platform, AlertController])
    ], UpgradePaymentPackageComponent);
    return UpgradePaymentPackageComponent;
}());
export { UpgradePaymentPackageComponent };
//# sourceMappingURL=upgrade-payment-package.component.js.map