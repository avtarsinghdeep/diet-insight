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
var NotificationPage = /** @class */ (function () {
    function NotificationPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
    }
    NotificationPage.prototype.ngOnInit = function () {
        var _this = this;
        var data = {
            user_id: this.dataService.userData.id
        };
        this.loadingService.present();
        this.apiService.notification_list(data).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.notifications = data.result;
                console.log(_this.notifications);
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    NotificationPage.prototype.typeClick = function (type) {
        console.log("type is :" + type);
        if (type == 'offer') {
            this.navController.navigateForward('servicesSide');
        }
        else if (type == 'appointment') {
            this.navController.navigateForward('/tabs/appointments');
        }
        else if (type == 'weight') {
            this.dataService.mealtypePage = '3';
            this.navController.navigateForward('addmeal');
        }
        else if (type == 'meal') {
            this.dataService.mealtypePage = '1';
            this.navController.navigateForward('addmeal');
        }
        else if (type == 'Dietchart') {
            this.navController.navigateForward('/tabs/mydietplan');
        }
        else if (type == 'water_intake') {
            this.dataService.mealtypePage = '2';
            this.navController.navigateForward('addmeal');
        }
    };
    NotificationPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    NotificationPage = __decorate([
        Component({
            selector: 'app-notification',
            templateUrl: './notification.page.html',
            styleUrls: ['./notification.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], NotificationPage);
    return NotificationPage;
}());
export { NotificationPage };
//# sourceMappingURL=notification.page.js.map