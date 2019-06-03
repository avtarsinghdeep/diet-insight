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
var MedicalProfile1Page = /** @class */ (function () {
    function MedicalProfile1Page(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.weightSelecter = true;
        this.heightSelecter = true;
    }
    MedicalProfile1Page.prototype.ngOnInit = function () {
    };
    MedicalProfile1Page.prototype.submit = function () {
        this.navController.navigateForward('medical-profile2');
    };
    MedicalProfile1Page = __decorate([
        Component({
            selector: 'app-medical-profile1',
            templateUrl: './medical-profile1.page.html',
            styleUrls: ['./medical-profile1.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], MedicalProfile1Page);
    return MedicalProfile1Page;
}());
export { MedicalProfile1Page };
//# sourceMappingURL=medical-profile1.page.js.map