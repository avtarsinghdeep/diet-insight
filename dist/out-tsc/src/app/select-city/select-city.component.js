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
var SelectCityComponent = /** @class */ (function () {
    function SelectCityComponent(loadingService, viewController, navParams) {
        this.loadingService = loadingService;
        this.viewController = viewController;
        this.navParams = navParams;
        this.loadingService.present();
    }
    SelectCityComponent.prototype.ngOnInit = function () {
    };
    SelectCityComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.navParams.get('cities'));
        this.main_data = this.navParams.get('cities');
        this.cities = this.navParams.get('cities');
        setInterval(function () {
            var a = localStorage['popoverStatus'];
            if (a == 0 || a == '0') {
                localStorage['popoverStatus'] = 1;
                _this.viewController.dismiss();
            }
        }, 2000);
        this.loadingService.dismiss();
    };
    SelectCityComponent.prototype.onInput = function (value) {
        var _this = this;
        // console.log(value)
        if (this.myInput == null || this.myInput == '') {
            this.cities = this.main_data;
        }
        else {
            if (this.myInput && this.myInput.trim() != '') {
                this.cities = this.main_data.filter(function (item) {
                    return (item.name.toLowerCase().indexOf(_this.myInput.toLowerCase()) > -1);
                });
            }
        }
    };
    SelectCityComponent.prototype.onCancel = function (value) {
    };
    SelectCityComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCountryPage');
    };
    SelectCityComponent.prototype.selectcity = function (val) {
        console.log(val);
        this.city = val.name;
        this.city_id = val.city_id;
    };
    SelectCityComponent.prototype.cancel = function () {
        console.log(this.city);
        this.viewController.dismiss();
    };
    SelectCityComponent.prototype.check = function () {
        console.log(this.city);
        if (this.city != null && this.city != '') {
            var data = {
                status: true,
                data: this.city.toLowerCase(),
                city_id: this.city_id,
                city_name: this.city.toLowerCase(),
            };
            this.viewController.dismiss(data);
        }
        else {
            this.viewController.dismiss();
        }
    };
    SelectCityComponent = __decorate([
        Component({
            selector: 'app-select-city',
            templateUrl: './select-city.component.html',
            styleUrls: ['./select-city.component.scss']
        }),
        __metadata("design:paramtypes", [LoadingService, PopoverController, NavParams])
    ], SelectCityComponent);
    return SelectCityComponent;
}());
export { SelectCityComponent };
//# sourceMappingURL=select-city.component.js.map