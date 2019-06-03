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
import * as moment from 'moment';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var HomePage = /** @class */ (function () {
    function HomePage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        console.log(this.dataService.userData);
        localStorage['profile_img'] = this.dataService.userData.profile_image;
        localStorage['user_name'] = this.dataService.userData.firstname;
    }
    HomePage.prototype.ionViewDidEnter = function () {
        console.log("ionViewDidEnter");
    };
    HomePage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.dashboard({
            user_id: this.dataService.userData.id
        }).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.has_package = data.result.has_package;
                console.log("has_package", _this.has_package);
                if (_this.has_package) {
                    _this.dashboard = data.result;
                    _this.dietchart = data.result.dietchart.meal;
                    _this.water_intake = data.result.water_intake;
                    _this.weight_tracker = data.result.weight_tracker;
                    _this.appointment = data.result.appointment;
                    console.log(_this.dietchart);
                }
                else {
                    _this.navController.navigateRoot('services');
                }
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
    HomePage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    HomePage.prototype.onAddMeal = function (val) {
        this.dataService.mealtypePage = val;
        this.navController.navigateForward('addmeal');
    };
    HomePage.prototype.check = function (value) {
        if (value.time != null || value.time != '' || value.time != undefined) {
            if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.time, 'hh:mm A').format())) {
                return false;
            }
            else {
                return true;
            }
        }
        else {
            if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) < new Date()) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'app-home',
            templateUrl: 'home.page.html',
            styleUrls: ['home.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController, AlertService])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map