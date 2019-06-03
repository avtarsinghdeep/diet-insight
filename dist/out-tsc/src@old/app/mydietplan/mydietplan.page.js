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
var MydietplanPage = /** @class */ (function () {
    function MydietplanPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.selected = null;
        this.type = null;
    }
    MydietplanPage.prototype.ngOnInit = function () {
        var _this = this;
        var data = {
            user_id: this.dataService.userData.id
        };
        this.loadingService.present();
        this.apiService.dietplan_list(data).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.dietchart = data.result;
                console.log(data.result.length);
                for (var i = 0; i < data.result.length; i++) {
                    _this.type = data.result[i].type;
                    console.log(data.result[i]);
                    for (var y = 0; y < data.result[i].meal.length; y++) {
                        console.log("meals are:" + JSON.stringify(data.result[i].meal[y]));
                        if (_this.type == 1) {
                            _this.name = data.result[i].meal[y].name;
                            console.log("type 1 name is :" + _this.name);
                        }
                        else if (_this.type == 2) {
                            _this.name = data.result[i].meal[y].mealName;
                            console.log("type 2 name is :" + _this.name);
                            for (var z = 0; z < data.result[i].meal[y].foodItems.length; z++) {
                                _this.name = data.result[i].meal[y].foodItems[z].food1;
                                console.log("type 2 FOOD ARRAY :" + _this.name);
                            }
                        }
                    }
                }
                //   for (let num of data.result) {
                //     console.log("result data"+num);
                // }
                // console.log(this.dietchart);
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
    MydietplanPage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    MydietplanPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    MydietplanPage.prototype.selectedItems = function (index) {
        console.log(index);
        this.selected = index;
    };
    MydietplanPage = __decorate([
        Component({
            selector: 'app-mydietplan',
            templateUrl: './mydietplan.page.html',
            styleUrls: ['./mydietplan.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], MydietplanPage);
    return MydietplanPage;
}());
export { MydietplanPage };
//# sourceMappingURL=mydietplan.page.js.map