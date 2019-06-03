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
var MedicalProfile1Page = /** @class */ (function () {
    function MedicalProfile1Page(apiService, loadingService, dataService, formBuilder, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.navController = navController;
        this.alertService = alertService;
        this.weightSelecter = true;
        this.heightSelecter = true;
        this.medical_profile = formBuilder.group({
            height: ['', Validators.compose([Validators.required])],
            weight: ['', Validators.compose([Validators.required])],
            blood_group: ['', Validators.compose([Validators.required])],
            medical_problem: ['', Validators.compose([Validators.required])],
        });
    }
    MedicalProfile1Page.prototype.chageHeight = function (heightSelecter) {
        this.medical_profile.controls.height.touched = true;
        if (heightSelecter) {
            console.log(this.cm);
            this.medical_profile.controls.height.setValue(this.cm);
        }
        else if (this.feet >= 0 && this.inch >= 0) {
            this.medical_profile.controls.height.setValue(Math.round((this.feet * 30.48) + (this.inch * 2.54)));
            console.log(this.medical_profile.value.height);
        }
    };
    MedicalProfile1Page.prototype.ngOnInit = function () {
        var _this = this;
        this.apiService.medical_problems_list().subscribe(function (data) {
            if (data.status_code = 200) {
                _this.medical_problems_list = data.result;
            }
            else {
                _this.medical_problems_list = [{ id: 0, problem_name: "Data not Found" }];
            }
        }, function (err) {
            console.log(err);
        });
    };
    MedicalProfile1Page.prototype.submit = function () {
        var _this = this;
        if (this.medical_profile.valid) {
            this.loadingService.present();
            var data = __assign({ user_id: this.dataService.userData.id }, this.medical_profile.value);
            this.apiService.medical_profile(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    _this.navController.navigateForward('medical-profile2');
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
    MedicalProfile1Page.prototype.skip = function () {
        this.navController.navigateForward('medical-profile2');
    };
    MedicalProfile1Page = __decorate([
        Component({
            selector: 'app-medical-profile1',
            templateUrl: './medical-profile1.page.html',
            styleUrls: ['./medical-profile1.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            FormBuilder,
            NavController,
            AlertService])
    ], MedicalProfile1Page);
    return MedicalProfile1Page;
}());
export { MedicalProfile1Page };
//# sourceMappingURL=medical-profile1.page.js.map