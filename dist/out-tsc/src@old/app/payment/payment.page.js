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
import { NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var PaymentPage = /** @class */ (function () {
    function PaymentPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.selected = null;
    }
    PaymentPage.prototype.ngOnInit = function () {
        this.entry = {};
        this.entry.isChecked = true;
        if (this.dataService.userData.payment_mode_save == true || this.dataService.userData.payment_mode_save == 'true') {
            //this.payment_mode_save=true
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
            //this.payment_mode_save=false
        }
        ;
    };
    PaymentPage.prototype.selectTab = function (index, value) {
        this.selected = index;
        this.submit(value);
        this.savepaymentmethod(value);
    };
    PaymentPage.prototype.savepaymentmethod = function (value) {
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
    PaymentPage.prototype.submit = function (value) {
        var _this = this;
        console.log(this.entry.isChecked);
        var data = {
            variation_id: this.dataService.data.variation_id,
            service_id: this.dataService.data.service_id,
            user_id: this.dataService.userData.id,
            payment_mode: value,
            payment_mode_save: this.entry.isChecked,
            payment_id: 'dsfdsf'
        };
        this.loadingService.present();
        this.apiService.buy_package(data).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                console.log(_this.dataService.pageType);
                if (_this.dataService.pageType == 'sidemenu') {
                    _this.navController.navigateForward('tabs');
                }
                else {
                    _this.navController.navigateForward('personal-profile');
                }
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
        console.log();
    };
    PaymentPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    PaymentPage = __decorate([
        Component({
            selector: 'app-payment',
            templateUrl: './payment.page.html',
            styleUrls: ['./payment.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.page.js.map