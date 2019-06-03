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
import { LoadingService, DataService } from '../shared/index';
var SelectCountryComponent = /** @class */ (function () {
    function SelectCountryComponent(dataService, loadingService, viewController, navParams) {
        this.dataService = dataService;
        this.loadingService = loadingService;
        this.viewController = viewController;
        this.navParams = navParams;
        this.loadingService.present();
    }
    SelectCountryComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.dataService.coutry_data);
        this.main_data = this.dataService.coutry_data;
        this.countries = this.dataService.coutry_data;
        setInterval(function () {
            var a = localStorage['popoverStatus'];
            if (a == 0 || a == '0') {
                localStorage['popoverStatus'] = 1;
                _this.viewController.dismiss();
            }
        }, 2000);
        this.loadingService.dismiss();
    };
    SelectCountryComponent.prototype.onInput = function (value) {
        var _this = this;
        // console.log(value)
        if (this.myInput == null || this.myInput == '') {
            this.countries = this.main_data;
            console.log("null");
        }
        else {
            if (this.myInput && this.myInput.trim() != '') {
                this.countries = this.main_data.filter(function (item) {
                    return (item.name.toLowerCase().indexOf(_this.myInput.toLowerCase()) > -1);
                });
            }
        }
    };
    SelectCountryComponent.prototype.onCancel = function (value) {
        console.log("val", value);
    };
    SelectCountryComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCountryPage');
    };
    SelectCountryComponent.prototype.cancel = function () {
        console.log(this.country);
        this.viewController.dismiss();
    };
    SelectCountryComponent.prototype.check = function () {
        var _this = this;
        console.log(this.country);
        if (this.country != null && this.country != '') {
            this.viewController.dismiss(this.main_data.filter(function (item) {
                return (item.country_code.toLowerCase().indexOf(_this.country.toLowerCase()) > -1);
            }));
        }
        else {
            this.viewController.dismiss();
        }
    };
    SelectCountryComponent = __decorate([
        Component({
            selector: 'app-select-country',
            templateUrl: './select-country.component.html',
            styleUrls: ['./select-country.component.scss']
        }),
        __metadata("design:paramtypes", [DataService, LoadingService, PopoverController, NavParams])
    ], SelectCountryComponent);
    return SelectCountryComponent;
}());
export { SelectCountryComponent };
//# sourceMappingURL=select-country.component.js.map