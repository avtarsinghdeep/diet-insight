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
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { NavController } from '@ionic/angular';
var FaqsPage = /** @class */ (function () {
    function FaqsPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.buttonIcon = "add";
        this.value = null;
    }
    FaqsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.faq_list().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.faqs = data.result;
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
    FaqsPage.prototype.enable = function (index, status) {
        // console.log(this.faqs[index].status);
        if (this.faqs[index].status == 1) {
            this.faqs[index].status = 0;
        }
        else {
            this.faqs[index].status = 1;
        }
    };
    FaqsPage.prototype.funcicon = function (val) {
        if (val == 0) {
            return 'remove';
        }
        else {
            return 'add';
        }
    };
    FaqsPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    FaqsPage = __decorate([
        Component({
            selector: 'app-faqs',
            templateUrl: './faqs.page.html',
            styleUrls: ['./faqs.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], FaqsPage);
    return FaqsPage;
}());
export { FaqsPage };
//# sourceMappingURL=faqs.page.js.map