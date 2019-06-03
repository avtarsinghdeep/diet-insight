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
// import {CalendarPageModule} from '../calendar/calendar.module'
import { NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { CalendarPage } from "../calendar/calendar.page";
var ReschedulePage = /** @class */ (function () {
    function ReschedulePage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.am_pm = 'AM';
        this.hours = '00';
        this.minutes = '00';
    }
    ReschedulePage.prototype.ngOnInit = function () {
        console.log(this.dataService.appointment_type);
    };
    ReschedulePage.prototype.receiveDate = function (event) {
        this.date = event;
    };
    ReschedulePage.prototype.hours_up = function () {
        if (parseInt(this.hours) < 11) {
            this.hours = (parseInt(this.hours) + 1).toString().length == 1 ? '0' + (parseInt(this.hours) + 1).toString() : (parseInt(this.hours) + 1).toString();
        }
        else {
            this.hours = '00';
        }
    };
    ReschedulePage.prototype.hours_down = function () {
        if (parseInt(this.hours) > 0) {
            this.hours = (parseInt(this.hours) - 1).toString().length == 1 ? '0' + (parseInt(this.hours) - 1).toString() : (parseInt(this.hours) - 1).toString();
        }
        else {
            this.hours = '11';
        }
    };
    ReschedulePage.prototype.minutes_up = function () {
        if (parseInt(this.minutes) < 59) {
            this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
        }
        else {
            this.minutes = '00';
        }
    };
    ReschedulePage.prototype.minutes_down = function () {
        if (parseInt(this.minutes) > 0) {
            this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
        }
        else {
            this.minutes = '59';
        }
    };
    ReschedulePage.prototype.am_pm_change = function () { this.am_pm == 'AM' ? this.am_pm = 'PM' : this.am_pm = 'AM'; };
    ReschedulePage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    ReschedulePage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    ReschedulePage.prototype.submit = function () {
        var _this = this;
        if (this.date != null && this.date != '' && this.date != undefined) {
            var dataValue = {
                user_id: this.dataService.userData.id,
                appointment_id: this.dataService.appointment_id,
                date: this.date,
                type: this.dataService.appointment_type,
                time: (this.am_pm == 'AM' ? this.hours : 12 + parseInt(this.hours)) + ':' + this.minutes
            };
            console.log(dataValue);
            this.loadingService.present();
            this.apiService.appointment_reschedule_request(dataValue).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    _this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Doctor.');
                    _this.navController.pop();
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', err);
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please select date.');
        }
    };
    __decorate([
        ViewChild(CalendarPage),
        __metadata("design:type", Object)
    ], ReschedulePage.prototype, "calendar", void 0);
    ReschedulePage = __decorate([
        Component({
            selector: 'app-reschedule',
            templateUrl: './reschedule.page.html',
            styleUrls: ['./reschedule.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], ReschedulePage);
    return ReschedulePage;
}());
export { ReschedulePage };
//# sourceMappingURL=reschedule.page.js.map