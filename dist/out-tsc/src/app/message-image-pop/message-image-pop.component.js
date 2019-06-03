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
var MessageImagePopComponent = /** @class */ (function () {
    function MessageImagePopComponent(navparams, popoverCtrl) {
        this.navparams = navparams;
        this.popoverCtrl = popoverCtrl;
        this.img = this.navparams.get('event');
    }
    MessageImagePopComponent.prototype.ngOnInit = function () {
    };
    MessageImagePopComponent.prototype.dismiss = function () {
        this.popoverCtrl.dismiss();
    };
    MessageImagePopComponent = __decorate([
        Component({
            selector: 'app-message-image-pop',
            templateUrl: './message-image-pop.component.html',
            styleUrls: ['./message-image-pop.component.scss']
        }),
        __metadata("design:paramtypes", [NavParams, PopoverController])
    ], MessageImagePopComponent);
    return MessageImagePopComponent;
}());
export { MessageImagePopComponent };
//# sourceMappingURL=message-image-pop.component.js.map