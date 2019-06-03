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
        console.log('receive date event', this.date);
    };
    ReschedulePage.prototype.hours_up = function () {
        if (this.am_pm == "AM") {
            if (parseInt(this.hours) < 11) {
                this.hours = (parseInt(this.hours) + 1).toString().length == 1 ? '0' + (parseInt(this.hours) + 1).toString() : (parseInt(this.hours) + 1).toString();
            }
            else {
                this.hours = '07';
            }
        }
        else {
            if (parseInt(this.hours) < 10) {
                this.hours = (parseInt(this.hours) + 1).toString().length == 1 ? '0' + (parseInt(this.hours) + 1).toString() : (parseInt(this.hours) + 1).toString();
            }
            else {
                this.hours = '00';
            }
        }
    };
    ReschedulePage.prototype.hours_down = function () {
        if (this.am_pm == "AM") {
            if (parseInt(this.hours) > 6) {
                this.hours = (parseInt(this.hours) - 1).toString().length == 1 ? '0' + (parseInt(this.hours) - 1).toString() : (parseInt(this.hours) - 1).toString();
            }
            else {
                this.hours = '11';
            }
        }
        else {
            if (parseInt(this.hours) > 0) {
                this.hours = (parseInt(this.hours) - 1).toString().length == 1 ? '0' + (parseInt(this.hours) - 1).toString() : (parseInt(this.hours) - 1).toString();
            }
            else {
                this.hours = '10';
            }
        }
    };
    ReschedulePage.prototype.minutes_up = function () {
        if (this.am_pm == "AM") {
            if (parseInt(this.minutes) < 59) {
                this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
            }
            else {
                this.minutes = '00';
            }
        }
        else {
            if (this.hours == '10') {
                if (parseInt(this.minutes) < 45) {
                    this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
                }
                else {
                    this.minutes = '00';
                }
            }
            else {
                if (parseInt(this.minutes) < 59) {
                    this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
                }
                else {
                    this.minutes = '00';
                }
            }
        }
    };
    ReschedulePage.prototype.minutes_down = function () {
        if (this.am_pm == "AM") {
            if (parseInt(this.minutes) > 0) {
                this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
            }
            else {
                this.minutes = '59';
            }
        }
        else {
            if (this.hours == '10') {
                if (parseInt(this.minutes) > 0) {
                    this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
                }
                else {
                    this.minutes = '45';
                }
            }
            else {
                if (parseInt(this.minutes) > 0) {
                    this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
                }
                else {
                    this.minutes = '59';
                }
            }
        }
    };
    ReschedulePage.prototype.am_pm_change = function () {
        this.am_pm == 'AM' ? this.am_pm = 'PM' : this.am_pm = 'AM';
    };
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
            console.log('DAATA', dataValue);
            var current_datetime = new Date();
            var formatted_date = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate();
            console.log('FORMATTED DATE', formatted_date);
            var c_value = formatted_date.split('-');
            console.log('c_value', c_value[0], c_value[1], c_value[2]);
            var c_year = c_value[0];
            var c_month = c_value[1] < 10 ? +"0" + c_value[1] : c_value[1];
            var c_date = c_value[2] < 10 ? +"0" + c_value[2] : c_value[2];
            console.log("current_date" + c_year + "-" + c_month + "-" + c_date);
            var current_date_format = c_year + "-" + c_month + "-" + c_date;
            var p = dataValue.date.split('-');
            console.log("split", p[0], p[1], p[2]);
            var year = p[0];
            var month = p[1] < 10 ? +"0" + p[1] : p[1];
            var date = p[2] < 10 ? +"0" + p[2] : p[2];
            var choose_format_date = year + "-" + month + "-" + date;
            console.log("new_format_date", choose_format_date + "," + current_date_format);
            this.today = Date.now();
            console.log('TODAYS DATE IS', current_date_format + "," + choose_format_date);
            var d = new Date(); // for now
            var hh = d.getHours() < 10 ? "0" + d.getHours() : d.getHours();
            var mm = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
            var currentTime = hh + ":" + mm;
            console.log("currentTime", currentTime);
            if (choose_format_date == current_date_format) {
                console.log('current DATE');
                console.log(dataValue.time + "," + currentTime);
                if (dataValue.time >= currentTime) {
                    console.log('greater');
                    this.loadingService.present();
                    this.apiService.appointment_reschedule_request(dataValue).subscribe(function (data) {
                        _this.loadingService.dismiss();
                        if (data.status_code == 200) {
                            _this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
                            _this.navController.navigateRoot('/tabs/appointments');
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
                    console.log("less");
                    this.alertService.presentAlert('Alert', 'Please select valid time !');
                }
            }
            else if (choose_format_date > current_date_format) {
                console.log('greater DATE');
                this.loadingService.present();
                this.apiService.appointment_reschedule_request(dataValue).subscribe(function (data) {
                    _this.loadingService.dismiss();
                    if (data.status_code == 200) {
                        _this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
                        _this.navController.navigateRoot('/tabs/appointments');
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
                console.log('please select valid date!!!!');
                console.log('please select valid date!!!!');
                this.alertService.presentAlert('Alert', 'Please select Valid Date !');
            }
        }
        else {
            this.alertService.presentAlert('Alert', 'Please select date.');
        }
    };
    ReschedulePage.prototype.onPop = function () {
        //this.navController.pop();
        this.navController.navigateBack('/tabs/appointments');
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
// var p=dataValue.date.split('-');
// 				console.log("split",p[0],p[1],p[2]);
// 				var year=p[0];
// 				var month=p[1]<10?+"0"+p[1]:p[1];
// 				var date=p[2]<10?+"0"+p[2]:p[2]
// 				var new_format_date=year+"-"+month+"-"+date;
// 				console.log("new_format_date",new_format_date);
// 			this.today = Date.now();
// 			console.log('TODAYS DATE IS', new Date().toISOString().slice(0,10)+","+dataValue.date);
// 			if(dataValue.date > new Date().toISOString().slice(0,10)){
// 				console.log('VALID DATE');
// 			}
// 			else{
// 				console.log('please select valid date!!!!');
// 			}
//# sourceMappingURL=reschedule.page.js.map