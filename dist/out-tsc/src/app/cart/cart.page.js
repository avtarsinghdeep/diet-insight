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
import { NavController, MenuController } from '@ionic/angular';
import { DataService } from '../shared/index';
import * as moment from 'moment';
var CartPage = /** @class */ (function () {
    function CartPage(dataService, navController, menuController) {
        this.dataService = dataService;
        this.navController = navController;
        this.menuController = menuController;
        this.date = moment().format('DD/MM/YYYY');
        if (this.dataService.pageType == "sidemenu") {
            this.menuController.enable(true, 'first');
        }
        else {
            this.menuController.enable(false, 'first');
        }
    }
    CartPage.prototype.ngOnInit = function () {
        console.log(this.dataService.data);
    };
    CartPage.prototype.submit = function () {
        this.navController.navigateForward('payment');
    };
    CartPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    CartPage = __decorate([
        Component({
            selector: 'app-cart',
            templateUrl: './cart.page.html',
            styleUrls: ['./cart.page.scss'],
        }),
        __metadata("design:paramtypes", [DataService, NavController, MenuController])
    ], CartPage);
    return CartPage;
}());
export { CartPage };
//# sourceMappingURL=cart.page.js.map