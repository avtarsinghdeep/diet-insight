var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import { Validators, FormBuilder } from '@angular/forms';
var MedicalProfile3Page = /** @class */ (function () {
    function MedicalProfile3Page(apiService, loadingService, dataService, formBuilder, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.alertService = alertService;
        this.medical_profile = formBuilder.group({
            smoking_relation: ['', Validators.compose([Validators.required])],
            alcohol_relation: ['', Validators.compose([Validators.required])],
            tobaco_relation: ['', Validators.compose([Validators.required])],
            aerated_drink_relation: ['', Validators.compose([Validators.required])],
            nature_of_work: ['', Validators.compose([Validators.required])],
            stress_level: ['', Validators.compose([Validators.required])],
        });
    }
    MedicalProfile3Page.prototype.ngOnInit = function () {
    };
    MedicalProfile3Page.prototype.submit = function () {
        var _this = this;
        if (this.medical_profile.valid) {
            this.loadingService.present();
            var data = __assign({ user_id: this.dataService.userData.id }, this.medical_profile.value);
            this.apiService.medical_profile(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    _this.navController.navigateRoot('tabs/home');
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
            });
        }
        else {
            this.alertService.presentAlert('Alert', 'Please fill all fields.');
        }
    };
    MedicalProfile3Page.prototype.skip = function () {
        this.navController.navigateRoot('tabs/home');
    };
    MedicalProfile3Page = __decorate([
        Component({
            selector: 'app-medical-profile3',
            templateUrl: './medical-profile3.page.html',
            styleUrls: ['./medical-profile3.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            FormBuilder,
            NavController,
            AlertService])
    ], MedicalProfile3Page);
    return MedicalProfile3Page;
}());
export { MedicalProfile3Page };
//# sourceMappingURL=medical-profile3.page.js.map