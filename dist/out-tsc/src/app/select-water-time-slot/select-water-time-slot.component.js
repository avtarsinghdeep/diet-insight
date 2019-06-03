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
var SelectWaterTimeSlotComponent = /** @class */ (function () {
    function SelectWaterTimeSlotComponent(navParams, viewCtrl) {
        this.navParams = navParams;
        this.viewCtrl = viewCtrl;
        this.food_meal_type = this.navParams.get('slot');
        console.log(JSON.stringify(this.food_meal_type), 'asd');
    }
    SelectWaterTimeSlotComponent.prototype.check = function () {
        this.viewCtrl.dismiss({ slot: this.gender });
    };
    SelectWaterTimeSlotComponent.prototype.cancel = function () {
        this.viewCtrl.dismiss();
    };
    SelectWaterTimeSlotComponent = __decorate([
        Component({
            selector: 'app-select-water-time-slot',
            templateUrl: './select-water-time-slot.component.html',
            styleUrls: ['./select-water-time-slot.component.scss']
        }),
        __metadata("design:paramtypes", [NavParams, PopoverController])
    ], SelectWaterTimeSlotComponent);
    return SelectWaterTimeSlotComponent;
}());
export { SelectWaterTimeSlotComponent };
//# sourceMappingURL=select-water-time-slot.component.js.map