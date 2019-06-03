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
        this.first = true;
        this.appoinments = [];
    }
    AppointmentsPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.selected = 0;
        if (this.first) {
            this.loadingService.present();
        }
        console.log(this.dataService.userData);
        var datavalue = {
            user_id: this.dataService.userData.id
        };
        this.apiService.appointment_list(datavalue).subscribe(function (data) {
            if (data.status_code == 200) {
                if (_this.first) {
                    _this.loadingService.dismiss();
                }
                _this.first = false;
                _this.appoinments = data.result;
                console.log('APPOINTMENTS ARE', _this.appoinments);
            }
            else if (data.status_code == 401) {
                localStorage.clear();
                _this.dataService.userData = '';
                _this.dataService.pageType = '';
                _this.dataService.tabPage = '';
                _this.loadingService.dismiss();
                _this.navController.navigateRoot('login');
                _this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
            }
            else {
                if (_this.first) {
                    _this.loadingService.dismiss();
                    _this.alertService.presentAlert('Alert', data.result);
                }
                _this.first = false;
                _this.appoinments = [];
            }
        }, function (err) {
            if (_this.first) {
                _this.loadingService.dismiss();
            }
            _this.first = false;
            //this.alertService.presentAlert('Alert', err)
        });
    };
    AppointmentsPage.prototype.ngOnInit = function () {
        console.log("ngOnInit");
        console.log('tabs appointments ', this.dataService.tabPage);
        // setTimeout(() => {
        // 	if (this.dataService.tabPage == "appointments") {
        // 		this.ionViewDidEnter();
        // 	}
        // 	this.ngOnInit();
        // }, 20000)
    };
    // notification() {
    // 	this.navController.navigateForward('notification');
    // }
    AppointmentsPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    AppointmentsPage.prototype.request = function (value, id, date) {
        var _this = this;
        ///////1 for reschedule//////////
        ////////2 for convert ///////////////
        /////////3 for cancel/////////////
        this.dataService.appointment_id = id;
        this.dataService.appointment_type = value;
        if (value == 1) {
            console.log("date", date);
            this.navController.navigateForward('reschedule');
            this.dataService.appointment_date = date;
        }
        else {
            var dataValue = {
                user_id: this.dataService.userData.id,
                appointment_id: this.dataService.appointment_id,
                type: this.dataService.appointment_type,
            };
            this.loadingService.present();
            this.apiService.appointment_reschedule_request(dataValue).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    if (value == 2) {
                        _this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
                    }
                    else if (value == 3) {
                        _this.alertService.presentAlert('Alert', data.result);
                    }
                    //this.navController.navigateRoot('/tabs/appointments');
                    _this.ionViewDidEnter();
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', err);
            });
        }
        // else {
        // 	this.navController.navigateForward('reschedule');
        // }
        this.selected = 0;
        // if(value == 2)
        // this.cancelRequest(value,id);
    };
    // cancelRequest(status, appt_id){
    // 	var datavalue = {
    // 		user_id: this.dataService.userData.id
    // 	}
    // 	this.apiService.appointment_list(datavalue).subscribe(data => {
    // 		if (data.status_code == 200) {
    // 		} else {
    // 		}
    // 	}, err => {
    // 		if (this.first) {
    // 			this.loadingService.dismiss()
    // 		}
    // 	})
    // }
    AppointmentsPage.prototype.onClose = function () {
        this.selected = 0;
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