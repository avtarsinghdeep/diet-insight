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
var PackagesPage = /** @class */ (function () {
    function PackagesPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.upgrade_package = [{
                package: '1 month,($1500)($300)',
                status: true
            },
            {
                package: '3 month,($2500)($700)',
                status: false
            },
            {
                package: '6 month,($5000)($1500)',
                status: false
            },
            {
                package: '12 month,($7500)($2500)',
                status: false
            }];
        this.packages = {};
        this.packageActivate = false;
    }
    PackagesPage.prototype.ngOnInit = function () {
        var _this = this;
        // localStorage['userId']
        var userId = {
            user_id: 99
        };
        this.loadingService.present();
        this.apiService.userPackage(userId).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.packages = data.result.package_detail;
                _this.variations = data.result.variation;
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
    PackagesPage.prototype.showPackage = function () {
        this.packageActivate = !this.packageActivate;
    };
    PackagesPage = __decorate([
        Component({
            selector: 'app-packages',
            templateUrl: './packages.page.html',
            styleUrls: ['./packages.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], PackagesPage);
    return PackagesPage;
}());
export { PackagesPage };
//# sourceMappingURL=packages.page.js.map