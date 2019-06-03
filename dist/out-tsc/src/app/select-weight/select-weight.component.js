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
var SelectWeightComponent = /** @class */ (function () {
    function SelectWeightComponent(viewController, navParams) {
        this.viewController = viewController;
        this.navParams = navParams;
        this.weightSelecter = true;
    }
    SelectWeightComponent.prototype.ngOnInit = function () {
    };
    SelectWeightComponent.prototype.cancel = function () {
        this.viewController.dismiss(null);
    };
    SelectWeightComponent.prototype.check = function () {
        if (this.weight != null && this.weight != '' && this.weight != undefined) {
            if (this.weightSelecter)
                this.viewController.dismiss(this.weight);
            if (!this.weightSelecter)
                this.viewController.dismiss(Math.round(this.weight / 2.205 * 100) / 100);
        }
    };
    SelectWeightComponent = __decorate([
        Component({
            selector: 'app-select-weight',
            templateUrl: './select-weight.component.html',
            styleUrls: ['./select-weight.component.scss']
        }),
        __metadata("design:paramtypes", [PopoverController, NavParams])
    ], SelectWeightComponent);
    return SelectWeightComponent;
}());
export { SelectWeightComponent };
//# sourceMappingURL=select-weight.component.js.map