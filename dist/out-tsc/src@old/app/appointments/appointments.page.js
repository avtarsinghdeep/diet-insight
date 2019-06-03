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
var AppointmentsPage = /** @class */ (function () {
    function AppointmentsPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.appoinments = [];
        this.selected = 0;
        this.appoinments = [];
    }
    AppointmentsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.selected = 0;
        this.loadingService.present();
        console.log(this.dataService.userData);
        var datavalue = { user_id: this.dataService.userData.id };
        this.apiService.appointment_list(datavalue).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.appoinments = data.result;
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', err);
        });
    };
    AppointmentsPage.prototype.ngOnInit = function () {
    };
    AppointmentsPage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    AppointmentsPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    AppointmentsPage.prototype.request = function (value, id) {
        this.dataService.appointment_id = id;
        this.dataService.appointment_type = value;
        if (value == 0) {
            this.navController.navigateForward('reschedule');
        }
        else {
            this.navController.navigateForward('reschedule');
        }
    };
    AppointmentsPage = __decorate([
        Component({
            selector: 'app-appointments',
            templateUrl: './appointments.page.html',
            styleUrls: ['./appointments.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], AppointmentsPage);
    return AppointmentsPage;
}());
export { AppointmentsPage };
//# sourceMappingURL=appointments.page.js.map