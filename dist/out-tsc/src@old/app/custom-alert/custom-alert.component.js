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
var CustomAlertComponent = /** @class */ (function () {
    function CustomAlertComponent(navparams, popoverController) {
        this.navparams = navparams;
        this.popoverController = popoverController;
        this.title = this.navparams.get('title');
        this.msg = this.navparams.get('msg');
        this.type = this.navparams.get('type');
    }
    CustomAlertComponent.prototype.ngOnInit = function () { };
    CustomAlertComponent.prototype.onCancel = function () {
        var data = {
            status: false,
        };
        this.popoverController.dismiss(data);
    };
    CustomAlertComponent.prototype.onSubmit = function () {
        var data = {
            status: true,
            type: this.type
        };
        this.popoverController.dismiss(data);
    };
    CustomAlertComponent = __decorate([
        Component({
            selector: 'app-custom-alert',
            templateUrl: './custom-alert.component.html',
            styleUrls: ['./custom-alert.component.scss']
        }),
        __metadata("design:paramtypes", [NavParams, PopoverController])
    ], CustomAlertComponent);
    return CustomAlertComponent;
}());
export { CustomAlertComponent };
//# sourceMappingURL=custom-alert.component.js.map