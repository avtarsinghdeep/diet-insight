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
import { PopoverController } from '@ionic/angular';
import { DataService } from '../shared/index';
var SelectMealType1Component = /** @class */ (function () {
    function SelectMealType1Component(popoverCtrl, dataService) {
        this.popoverCtrl = popoverCtrl;
        this.dataService = dataService;
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
        this.meal_time = date;
    };
    SelectMealType1Component.prototype.onSubmit = function (val) {
        if (val == 1) {
            var data = { status: true,
                role: this.meal_time,
                id: "1",
                time: this.meal_time
            };
            this.dataService.meal_name = this.meal_name;
            this.dataService.meal_time = this.meal_time;
            this.popoverCtrl.dismiss(data);
        }
        else {
            var data1 = { status: false };
            this.popoverCtrl.dismiss(data1);
        }
    };
    SelectMealType1Component = __decorate([
        Component({
            selector: 'app-select-meal-type1',
            templateUrl: './select-meal-type1.component.html',
            styleUrls: ['./select-meal-type1.component.scss']
        }),
        __metadata("design:paramtypes", [PopoverController, DataService])
    ], SelectMealType1Component);
    return SelectMealType1Component;
}());
export { SelectMealType1Component };
//# sourceMappingURL=select-meal-type1.component.js.map