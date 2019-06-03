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
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { NavController, AlertController } from '@ionic/angular';
var NotificationPage = /** @class */ (function () {
    function NotificationPage(apiService, loadingService, dataService, navController, alertService, alertCtrl) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.alertCtrl = alertCtrl;
        this.first = true;
    }
    NotificationPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        var data = {
            user_id: this.dataService.userData.id
        };
        if (this.first) {
            this.loadingService.present();
        }
        this.apiService.notification_list(data).subscribe(function (data) {
            if (_this.first) {
                _this.loadingService.dismiss();
            }
            if (data.status_code == 200) {
                if (_this.first) {
                    _this.loadingService.dismiss();
                }
                _this.notifications = data.result;
                console.log('Notifications are:', _this.notifications);
                _this.first = false;
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
                    _this.alertService.presentAlert('Alert', data.result);
                    _this.notifications = "";
                }
                _this.first = false;
            }
        }, function (err) {
            if (_this.first) {
                _this.loadingService.dismiss();
                //this.alertService.presentAlert('Alert', 'Something went wrong...');
            }
            console.log(err);
        });
    };
    NotificationPage.prototype.presentAlertConfirm = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertCtrl.create({
                            message: 'Are you sure want to remove all notifications?',
                            buttons: [
                                {
                                    text: 'No',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function (blah) {
                                        console.log('Confirm Cancel: blah');
                                    }
                                }, {
                                    text: 'Yes',
                                    handler: function () {
                                        _this.trash();
                                        console.log('Confirm Okay');
                                    }
                                }
                            ]
                        })];
                    case 1:
                        alert = _a.sent();
                        return [4 /*yield*/, alert.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    NotificationPage.prototype.trash = function () {
        var _this = this;
        console.log('clear notification clicked');
        var data = {
            user_id: this.dataService.userData.id
        };
        this.apiService.notification_clearlist(data).subscribe(function (data) {
            console.log(_this.dataService.userData.id);
            if (data.status_code == 200) {
                // console.log('clear notification data', data);
                _this.alertService.presentAlert('Alert', data.result);
                _this.notifications = [];
                _this.ionViewDidEnter();
            }
            else {
                console.log(data.status_code);
            }
        }, function (err) {
            if (_this.first) {
                _this.loadingService.dismiss();
                //this.alertService.presentAlert('Alert', 'Something went wrong...');
            }
            console.log(err);
        });
    };
    NotificationPage.prototype.ionViewDidLeave = function () {
        this.first = false;
        console.log("notification", this.first);
    };
    NotificationPage.prototype.ngOnInit = function () {
        //   setTimeout(() => {
        // 	if (this.dataService.tabPage == "notification") {
        // 		this.ionViewDidEnter();
        // 	}
        // 	this.ngOnInit();
        // }, 10000)
    };
    NotificationPage.prototype.typeClick = function (type) {
        console.log("type is :" + type);
        if (type == 'offer') {
            this.navController.navigateForward('servicesSide');
        }
        else if (type == 'appointment') {
            this.navController.navigateForward('/tabs/appointments');
        }
        else if (type == 'weight') {
            this.dataService.mealtypePage = '3';
            this.navController.navigateForward('addmeal');
        }
        else if (type == 'meal') {
            this.dataService.mealtypePage = '1';
            this.navController.navigateForward('addmeal');
        }
        else if (type == 'Dietchart' || type == 'DietChart') {
            this.navController.navigateForward('/tabs/mydietplan');
        }
        else if (type == 'water_intake') {
            this.dataService.mealtypePage = '2';
            this.navController.navigateForward('addmeal');
        }
    };
    NotificationPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    NotificationPage = __decorate([
        Component({
            selector: 'app-notification',
            templateUrl: './notification.page.html',
            styleUrls: ['./notification.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService, AlertController])
    ], NotificationPage);
    return NotificationPage;
}());
export { NotificationPage };
//# sourceMappingURL=notification.page.js.map