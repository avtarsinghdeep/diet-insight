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
var SelectWaterComponent = /** @class */ (function () {
    function SelectWaterComponent(viewController, navParams) {
        this.viewController = viewController;
        this.navParams = navParams;
        this.glasses = 1;
        this.page = 1;
    }
    SelectWaterComponent.prototype.ngOnInit = function () {
    };
    SelectWaterComponent.prototype.cancel = function () {
        this.viewController.dismiss(null);
    };
    SelectWaterComponent.prototype.check = function () {
        console.log(this.glasses);
        this.viewController.dismiss(this.glasses);
        // if(this.weight!=null&&this.weight!=''&&this.weight!=undefined){
        // 	if(this.weightSelecter)this.viewController.dismiss(this.weight);
        // 	if(!this.weightSelecter)this.viewController.dismiss(Math.round(this.weight/2.205*100)/100);
        // }
    };
    SelectWaterComponent = __decorate([
        Component({
            selector: 'app-select-water',
            templateUrl: './select-water.component.html',
            styleUrls: ['./select-water.component.scss']
        }),
        __metadata("design:paramtypes", [PopoverController, NavParams])
    ], SelectWaterComponent);
    return SelectWaterComponent;
}());
export { SelectWaterComponent };
//# sourceMappingURL=select-water.component.js.map