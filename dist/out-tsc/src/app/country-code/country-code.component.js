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
import { NavParams, PopoverController } from '@ionic/angular';
import { LoadingService } from '../shared/index';
var CountryCodeComponent = /** @class */ (function () {
    function CountryCodeComponent(loadingService, viewController, navParams) {
        this.loadingService = loadingService;
        this.viewController = viewController;
        this.navParams = navParams;
        this.loadingService.present();
    }
    CountryCodeComponent.prototype.ngOnInit = function () {
    };
    CountryCodeComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.navParams.get('codes'));
        this.main_data = this.navParams.get('codes');
        this.countryCode = this.navParams.get('codes');
        setInterval(function () {
            var a = localStorage['popoverStatus'];
            if (a == 0 || a == '0') {
                localStorage['popoverStatus'] = 1;
                _this.viewController.dismiss();
            }
        }, 2000);
        this.loadingService.dismiss();
    };
    CountryCodeComponent.prototype.onInput = function (value) {
        var _this = this;
        // console.log(value)
        if (this.myInput == null || this.myInput == '') {
            this.countryCode = this.main_data;
        }
        else {
            if (this.myInput && this.myInput.trim() != '') {
                this.countryCode = this.main_data.filter(function (item) {
                    return (item.name.toLowerCase().indexOf(_this.myInput.toLowerCase()) > -1);
                });
            }
            else {
                this.countryCode = this.main_data;
            }
        }
    };
    CountryCodeComponent.prototype.onCancel = function (value) {
    };
    CountryCodeComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCountryPage');
    };
    CountryCodeComponent.prototype.selectcity = function (val) {
        console.log(val);
        this.code = val.name;
        this.dial_code = val.dial_code;
        this.code_image = val.img;
    };
    CountryCodeComponent.prototype.cancel = function () {
        console.log(this.code);
        this.viewController.dismiss();
    };
    CountryCodeComponent.prototype.check = function () {
        console.log(this.code);
        if (this.code != null && this.code != '') {
            var data = {
                status: true,
                data: this.code.toLowerCase(),
                dial_code: this.dial_code,
                country_name: this.code.toLowerCase(),
                code_image: this.code_image
            };
            this.viewController.dismiss(data);
        }
        else {
            this.viewController.dismiss();
        }
    };
    CountryCodeComponent = __decorate([
        Component({
            selector: 'app-country-code',
            templateUrl: './country-code.component.html',
            styleUrls: ['./country-code.component.scss']
        }),
        __metadata("design:paramtypes", [LoadingService, PopoverController, NavParams])
    ], CountryCodeComponent);
    return CountryCodeComponent;
}());
export { CountryCodeComponent };
//# sourceMappingURL=country-code.component.js.map