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
import { PopoverController, ModalController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var SelectMealType1Component = /** @class */ (function () {
    function SelectMealType1Component(popoverCtrl, dataService, apiService, loadingService, alertService, modalCtrl) {
        this.popoverCtrl = popoverCtrl;
        this.dataService = dataService;
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.alertService = alertService;
        this.modalCtrl = modalCtrl;
    }
    SelectMealType1Component.prototype.ngOnInit = function () {
    };
    SelectMealType1Component.prototype.converTime = function (time) {
        var hour = (time.split(':'))[0];
        var min = (time.split(':'))[1];
        var part = hour > 12 ? 'pm' : 'am';
        min = (min + '').length == 1 ? "0" + min : min;
        hour = hour > 12 ? hour - 12 : hour;
        hour = (hour + '').length == 1 ? "0" + hour : hour;
        return (hour + ":" + min + " " + part);
    };
    SelectMealType1Component.prototype.change = function (date) {
        console.log('click..', date);
        function timeTo12HrFormat(time) {
            var time_part_array = time.split(":");
            var ampm = 'AM';
            if (time_part_array[0] >= 12) {
                ampm = 'PM';
            }
            if (time_part_array[0] > 12) {
                time_part_array[0] = time_part_array[0] - 12;
            }
            var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ':' + time_part_array[2] + ' ' + ampm;
            return formatted_time;
        }
        var time = timeTo12HrFormat(date);
        this.meal_time = time;
        console.log(time); // 6:00:00 PM
    };
    SelectMealType1Component.prototype.onSubmit = function (val) {
        var _this = this;
        console.log(this.meal_time);
        if (val == 1) {
            var a = {
                user_id: this.dataService.userData.id,
                meal_value: this.meal_name,
                meal_time: this.meal_time
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
                    var b = {
                        status: false
                    };
                    _this.modalCtrl.dismiss(b);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
                var b = {
                    status: false
                };
                _this.modalCtrl.dismiss(b);
            });
        }
        else {
            var data1 = { status: false };
            this.modalCtrl.dismiss(data1);
        }
    };
    SelectMealType1Component = __decorate([
        Component({
            selector: 'app-select-meal-type1',
            templateUrl: './select-meal-type1.component.html',
            styleUrls: ['./select-meal-type1.component.scss']
        }),
        __metadata("design:paramtypes", [PopoverController, DataService, ApiService, LoadingService, AlertService, ModalController])
    ], SelectMealType1Component);
    return SelectMealType1Component;
}());
export { SelectMealType1Component };
//# sourceMappingURL=select-meal-type1.component.js.map