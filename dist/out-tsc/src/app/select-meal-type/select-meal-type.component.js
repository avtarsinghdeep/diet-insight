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
import { ModalController } from '@ionic/angular';
var SelectMealTypeComponent = /** @class */ (function () {
    function SelectMealTypeComponent(apiService, loadingService, dataService, alertService, modalCtrl) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.modalCtrl = modalCtrl;
        this.maindata = [];
        this.mealQuantity = false;
        console.log("mealpage", this.dataService.meal_time, this.dataService.meal_name);
    }
    SelectMealTypeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.fooditems().subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                var array = [];
                for (var i = 0; i < data.result.length; i++) {
                    var obj = data.result[i];
                    obj.selected = false;
                    obj.food_qty = 1;
                    array.push(obj);
                }
                _this.data = array;
                _this.maindata = array;
                console.log(array);
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    SelectMealTypeComponent.prototype.onInput = function (ev) {
        var val = ev.target.value;
        this.data = this.maindata;
        if (val && val.trim() != '') {
            this.data = this.data.filter(function (item) {
                return (item.food_item.toLowerCase().indexOf(val.toLowerCase()) > -1);
            });
        }
        else {
            this.data = this.maindata;
        }
    };
    SelectMealTypeComponent.prototype.selectItem = function (item) {
        console.log(item);
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == item.id) {
                this.data[i].selected = item.selected;
            }
        }
    };
    SelectMealTypeComponent.prototype.add = function (i) {
        this.meal_value[i].food_qty++;
    };
    SelectMealTypeComponent.prototype.remove = function (i) {
        this.meal_value[i].food_qty > 1 ? this.meal_value[i].food_qty-- : '';
    };
    SelectMealTypeComponent.prototype.add_user_meal = function () {
        console.log("addusermeal");
        var array = [];
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].selected == true) {
                array.push(this.data[i]);
            }
        }
        console.log(array, array.length);
        if (array.length >= 1) {
            var a = {
                user_id: this.dataService.userData.id,
                meal_value: array,
                meal_name: this.dataService.meal_name,
                meal_time: this.dataService.meal_time
            };
            this.dataService.mealType = a;
            this.meal_value = array;
            this.mealQuantity = true;
        }
        else {
            this.alertService.presentAlert('Alert', 'Plase select food item');
        }
    };
    SelectMealTypeComponent.prototype.savemeal = function () {
        var _this = this;
        console.log("savemeal");
        var a = {
            user_id: this.dataService.userData.id,
            meal_value: this.meal_value,
            meal_name: this.dataService.meal_name,
            meal_time: this.dataService.meal_time
        };
        console.log(a);
        this.loadingService.present();
        this.apiService.add_user_meal(a).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                var b = {
                    status: true
                };
                _this.modalCtrl.dismiss(b);
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    SelectMealTypeComponent.prototype.onDismiss = function (val) {
        var b = {
            status: false
        };
        this.modalCtrl.dismiss(b);
    };
    SelectMealTypeComponent = __decorate([
        Component({
            selector: 'app-select-meal-type',
            templateUrl: './select-meal-type.component.html',
            styleUrls: ['./select-meal-type.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            AlertService, ModalController])
    ], SelectMealTypeComponent);
    return SelectMealTypeComponent;
}());
export { SelectMealTypeComponent };
//# sourceMappingURL=select-meal-type.component.js.map