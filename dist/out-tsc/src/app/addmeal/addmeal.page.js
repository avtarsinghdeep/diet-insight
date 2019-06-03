var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { Component } from '@angular/core';
import { SelectMealTypeComponent } from '../select-meal-type/select-meal-type.component';
import { ModalController, PopoverController, NavController } from '@ionic/angular';
import { SelectMealType1Component } from '../select-meal-type1/select-meal-type1.component';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { SelectWeightComponent } from '../select-weight/select-weight.component';
import { SelectWaterComponent } from '../select-water/select-water.component';
import { SelectWaterTimeSlotComponent } from '../select-water-time-slot/select-water-time-slot.component';
var AddmealPage = /** @class */ (function () {
    function AddmealPage(modalController, popoverController, apiService, loadingService, dataService, alertService, navController) {
        this.modalController = modalController;
        this.popoverController = popoverController;
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.navController = navController;
        this.selectedTabIndex = this.dataService.mealtypePage;
        this.water_tab_detail = { goal: null, history: [], ideal_water: null };
        var date = new Date();
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
        console.log(date.getDate() + "," + months[date.getMonth()] + "," + date.getFullYear());
        this.day = date.getDate();
        this.month = months[date.getMonth()];
        this.year = date.getFullYear();
    }
    AddmealPage.prototype.ngOnInit = function () {
        var _this = this;
        this.user_weight_history();
        this.loadingService.present();
        this.apiService.user_daily_meals({ user_id: this.dataService.userData.id }).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.user_daily_meal = data.result;
                console.log(_this.user_daily_meal);
            }
            else {
                //this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    AddmealPage.prototype.segmentChanged = function (event, selectedTabIndex) {
    };
    AddmealPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    AddmealPage.prototype.onAddMeal = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: SelectMealType1Component,
                            componentProps: { value: 123 }
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            console.log("data", data);
                            if (data.data.status == true) {
                                _this.ngOnInit();
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // async onAddMeal(ev: any){
    //   const popover = await this.popoverController.create({
    //     component: SelectMealType1Component,
    //     event: ev,
    //     translucent: true,
    //     cssClass:'custom-popover'
    //   });
    //  popover.onDidDismiss()
    //     .then((data:any) => {
    //       if (data.data.status==true) {
    //       console.log(data);
    //      this.popover()
    //       }
    //       else{
    //       console.log('false');  
    //       }
    //   });
    //   return await popover.present();
    // }
    AddmealPage.prototype.popover = function () {
        return __awaiter(this, void 0, void 0, function () {
            var modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.modalController.create({
                            component: SelectMealTypeComponent,
                            componentProps: { value: 123 },
                            cssClass: 'custom-popover'
                        })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            if (data.data.status == true) {
                                console.log(data);
                                _this.ngOnInit();
                            }
                            else {
                                console.log('false');
                            }
                        });
                        return [4 /*yield*/, modal.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddmealPage.prototype.JSONfun = function (val) {
        return JSON.parse(val);
    };
    AddmealPage.prototype.user_weight_history = function () {
        var _this = this;
        this.apiService.user_weight_history({ user_id: this.dataService.userData.id }).subscribe(function (data) {
            _this.current1 = parseFloat(data.result.current).toFixed(3);
            // this.current = "125.000";
            if (_this.current1.split(".")[1] == 0) {
                console.log('0 after decimal');
                _this.current = parseFloat(data.result.current);
            }
            else {
                console.log('another num after decimal');
                _this.current = parseFloat(data.result.current).toFixed(3);
            }
            // console.log('weighthththtthhtht',data.result.current, this.current.split("."), parseFloat(data.result.current).toFixed(3));
            _this.initial = data.result.initial;
            _this.average1 = parseFloat(data.result.average).toFixed(3);
            if (_this.average1.split(".")[1] == 0) {
                _this.average = parseFloat(data.result.average);
            }
            else {
                _this.average = parseFloat(data.result.average).toFixed(3);
            }
        }, function (err) {
            _this.alertService.presentAlert('Alert', err);
        });
        this.apiService.time_slots().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.water_time_slot = data.result;
            }
        }, function (err) { });
        this.apiService.water_intake_history({ user_id: this.dataService.userData.id }).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.water_tab_detail = data.result;
                console.log('water intake', _this.water_tab_detail);
            }
        }, function (err) { });
    };
    AddmealPage.prototype.addWater = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: SelectWaterComponent,
                            cssClass: 'custom-popover'
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (data) {
                            if (data.data != null) {
                                console.log(data.data);
                                console.log(_this.water_time_slot);
                                var dataValue = {
                                    glassess: data.data,
                                    time_slot: _this.water_time_slot
                                };
                                _this.waterTimeslot(dataValue);
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddmealPage.prototype.waterTimeslot = function (datavalue) {
        return __awaiter(this, void 0, void 0, function () {
            var timepop;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: SelectWaterTimeSlotComponent,
                            componentProps: { slot: datavalue.time_slot },
                            cssClass: 'custom-popover'
                        })];
                    case 1:
                        timepop = _a.sent();
                        timepop.onDidDismiss().then(function (data) {
                            if (data.data != null) {
                                console.log(data);
                                console.log(datavalue);
                                _this.loadingService.present();
                                _this.apiService.add_water_intake({
                                    user_id: _this.dataService.userData.id,
                                    slot: data.data.slot,
                                    no_of_glass: datavalue.glassess
                                })
                                    .subscribe(function (data) {
                                    _this.loadingService.dismiss();
                                    _this.alertService.presentAlert('Alert', data.result);
                                    _this.ngOnInit();
                                }, function (err) {
                                    _this.loadingService.dismiss();
                                    _this.alertService.presentAlert('Alert', err);
                                });
                            }
                        });
                        return [4 /*yield*/, timepop.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddmealPage.prototype.addWeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: SelectWeightComponent,
                            cssClass: 'custom-popover1'
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss().then(function (data) {
                            if (data.data != null) {
                                var dataValue = {
                                    weight: data.data,
                                    user_id: _this.dataService.userData.id
                                };
                                _this.loadingService.present();
                                _this.apiService.add_user_weight(dataValue).subscribe(function (data) {
                                    _this.alertService.presentAlert('Alert', data.result);
                                    _this.loadingService.dismiss();
                                    _this.ngOnInit();
                                }, function (err) {
                                    _this.loadingService.dismiss();
                                    _this.alertService.presentAlert('Alert', err);
                                });
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AddmealPage.prototype.ionViewWillLeave = function () {
        console.log("leave addmeal");
        this.dataService.dashboard_nav = true;
        console.log("Addval", this.dataService.dashboard_nav);
    };
    AddmealPage = __decorate([
        Component({
            selector: 'app-addmeal',
            templateUrl: './addmeal.page.html',
            styleUrls: ['./addmeal.page.scss'],
        }),
        __metadata("design:paramtypes", [ModalController, PopoverController, ApiService,
            LoadingService,
            DataService,
            AlertService, NavController])
    ], AddmealPage);
    return AddmealPage;
}());
export { AddmealPage };
//# sourceMappingURL=addmeal.page.js.map