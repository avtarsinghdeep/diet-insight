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
var ServicesPage = /** @class */ (function () {
    function ServicesPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.services = [];
    }
    ServicesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.services_list().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.services = data.result;
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    ServicesPage.prototype.openDetail = function (service) {
        this.dataService.data = service;
        this.navController.navigateForward('service-detail');
        console.log(this.dataService.data);
    };
    ServicesPage = __decorate([
        Component({
            selector: 'app-services',
            templateUrl: './services.page.html',
            styleUrls: ['./services.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], ServicesPage);
    return ServicesPage;
}());
export { ServicesPage };
//# sourceMappingURL=services.page.js.map