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
import { NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var MedicalProfile3Page = /** @class */ (function () {
    function MedicalProfile3Page(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
    }
    MedicalProfile3Page.prototype.ngOnInit = function () {
    };
    MedicalProfile3Page.prototype.submit = function () {
        this.navController.navigateRoot('tabs/home');
    };
    MedicalProfile3Page = __decorate([
        Component({
            selector: 'app-medical-profile3',
            templateUrl: './medical-profile3.page.html',
            styleUrls: ['./medical-profile3.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], MedicalProfile3Page);
    return MedicalProfile3Page;
}());
export { MedicalProfile3Page };
//# sourceMappingURL=medical-profile3.page.js.map