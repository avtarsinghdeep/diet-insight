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
var PackageUpgradeComponent = /** @class */ (function () {
    function PackageUpgradeComponent(apiService, loadingService, dataService, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.alertService = alertService;
        var d = new Date();
    }
    PackageUpgradeComponent.prototype.ngOnInit = function () {
    };
    PackageUpgradeComponent.prototype.onSubmit = function () {
        var _this = this;
        var a = {};
        this.loadingService.present();
        this.apiService.packageupdate(a).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    PackageUpgradeComponent = __decorate([
        Component({
            selector: 'app-package-upgrade',
            templateUrl: './package-upgrade.component.html',
            styleUrls: ['./package-upgrade.component.scss']
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            AlertService])
    ], PackageUpgradeComponent);
    return PackageUpgradeComponent;
}());
export { PackageUpgradeComponent };
//# sourceMappingURL=package-upgrade.component.js.map