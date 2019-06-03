var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, IonContent } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var ServiceDetailPage = /** @class */ (function () {
    function ServiceDetailPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.service = null;
        this.plan = null;
        this.feature_selected = 0;
        this.section = "description";
    }
    ServiceDetailPage.prototype.ngOnInit = function () {
        this.service = this.dataService.data;
    };
    ServiceDetailPage.prototype.packageSelect = function (value) {
        this.plan = value;
        // setTimeout(()=>{
        // 	this.content.scrollToBottom();
        // },100)
    };
    ServiceDetailPage.prototype.buy = function (plan, index) {
        this.dataService.data.variation_id = plan.variation_id;
        this.dataService.data.variation_index = index;
        this.navController.navigateForward('term-conditions');
        // this.navController.navigateForward('payment');
    };
    ServiceDetailPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], ServiceDetailPage.prototype, "content", void 0);
    ServiceDetailPage = __decorate([
        Component({
            selector: 'app-service-detail',
            templateUrl: './service-detail.page.html',
            styleUrls: ['./service-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], ServiceDetailPage);
    return ServiceDetailPage;
}());
export { ServiceDetailPage };
//# sourceMappingURL=service-detail.page.js.map