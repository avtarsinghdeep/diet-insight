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
        this.first = true;
    }
    MydietplanPage.prototype.ngOnInit = function () {
        console.log("ngOnInit");
        console.log('tabs diet plan ', this.dataService.tabPage);
        // setTimeout(() => {
        //   if (this.dataService.tabPage == "mydietplan") {
        //     this.ionViewDidEnter();
        //   }
        //   this.ngOnInit();
        // }, 20000)
    };
    MydietplanPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var data = {
            user_id: this.dataService.userData.id
        };
        if (this.first) {
            this.loadingService.present();
        }
        this.apiService.dietplan_list(data).subscribe(function (data) {
            if (_this.first) {
                _this.loadingService.dismiss();
            }
            _this.first = false;
            if (data.status_code == 200) {
                if (_this.first) {
                    _this.loadingService.dismiss();
                }
                var a;
                var MyArrayDummy = [];
                var p;
                if (data.result.length == 1) {
                    _this.status = true;
                }
                else {
                    _this.status = false;
                }
                for (var i = 0; i < data.result.length; i++) {
                    p = data.result[i];
                    p.status = _this.status;
                    MyArrayDummy.push(p);
                }
                _this.dietchart = MyArrayDummy;
                console.log("diet_c", _this.dietchart);
                var numericArray = [2, 3, 4, 1, 5, 8, 11];
                var sortedArray = _this.dietchart.sort(function (n1, n2) { return n2.date - n1.date; });
                console.log('sorted array', sortedArray);
                console.log(data.result.length);
                for (var i = 0; i < data.result.length; i++) {
                    _this.type = data.result[i].type;
                    // console.log(data.result[i]);
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
                    //this.alertService.presentAlert('Alert', data.result);
                }
            }
        }, function (err) {
            if (_this.first) {
                _this.loadingService.dismiss();
            }
            //this.alertService.presentAlert('Alert', 'Something went wrong...')
            console.log(err);
        });
    };
    // notification() {
    //   this.navController.navigateForward('notification');
    // }
    MydietplanPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    MydietplanPage.prototype.selectedItems = function (index) {
        console.log(index);
        //this.selected = index;
        if (this.dietchart[index].status == true) {
            this.dietchart[index].status = false;
        }
        else {
            this.dietchart[index].status = true;
        }
        console.log(this.dietchart);
    };
    MydietplanPage.prototype.valueReplace = function (str) {
        var str1 = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return str1;
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