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
import { ToastController, NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var SettingPage = /** @class */ (function () {
    function SettingPage(toastController, loadingService, apiService, dataService, alertService, navController) {
        this.toastController = toastController;
        this.loadingService = loadingService;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.navController = navController;
        this.water_intake = true;
        console.log(this.dataService.userData);
        if (this.dataService.userData.settings.length > 0) {
            this.water_intake = this.dataService.userData.settings[0].value;
        }
    }
    SettingPage.prototype.ngOnInit = function () {
    };
    SettingPage.prototype.change = function (val, title) {
        var _this = this;
        console.log(this.water_intake);
        var data = {
            value: val ? 1 : 0,
            title: title,
            user_id: this.dataService.userData.id
        };
        this.loadingService.present();
        this.apiService.notification_settings(data).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.presentToast(data.result);
            }
            else {
                _this.loadingService.dismiss();
                _this.presentToast('Something went wrong...');
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.presentToast('Something went wrong...');
        });
    };
    SettingPage.prototype.presentToast = function (val) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: val,
                            duration: 2000
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    SettingPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    SettingPage.prototype.ionViewWillLeave = function () {
        console.log("leave setting");
        this.dataService.dashboard_nav = true;
        console.log("setting", this.dataService.dashboard_nav);
    };
    SettingPage = __decorate([
        Component({
            selector: 'app-setting',
            templateUrl: './setting.page.html',
            styleUrls: ['./setting.page.scss'],
        }),
        __metadata("design:paramtypes", [ToastController, LoadingService,
            ApiService,
            DataService,
            AlertService, NavController])
    ], SettingPage);
    return SettingPage;
}());
export { SettingPage };
//# sourceMappingURL=setting.page.js.map