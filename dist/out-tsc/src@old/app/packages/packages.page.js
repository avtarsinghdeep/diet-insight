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
import { NavController, PopoverController, ModalController } from '@ionic/angular';
import { PackageUpgradeComponent } from '../package-upgrade/package-upgrade.component';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { UpgradePaymentPackageComponent } from '../upgrade-payment-package/upgrade-payment-package.component';
var PackagesPage = /** @class */ (function () {
    function PackagesPage(apiService, loadingService, dataService, navController, alertService, popoverController, modalController) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.popoverController = popoverController;
        this.modalController = modalController;
        this.upgrade_package = [{
                package: '1 month,($1500)($300)',
                status: true
            },
            {
                package: '3 month,($2500)($700)',
                status: false
            },
            {
                package: '6 month,($5000)($1500)',
                status: false
            },
            {
                package: '12 month,($7500)($2500)',
                status: false
            }];
        this.packageActivate = false;
        this.packages = {};
    }
    PackagesPage.prototype.ngOnInit = function () {
        var _this = this;
        // localStorage['userId']
        var userId = {
            user_id: this.dataService.userData.id
        };
        this.loadingService.present();
        this.apiService.userPackage(userId).subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.packages = data.result.package_detail;
                _this.variations = data.result.variation;
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    PackagesPage.prototype.presentPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: PackageUpgradeComponent,
                            event: ev,
                            translucent: true
                        })];
                    case 1:
                        popover = _a.sent();
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    PackagesPage.prototype.showPackage = function () {
        this.packageActivate = !this.packageActivate;
    };
    PackagesPage.prototype.upgradePackage = function (variation_id, duration_price_inr) {
        return __awaiter(this, void 0, void 0, function () {
            var payment_price, modal;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        payment_price = duration_price_inr - this.packages.current_package_amount;
                        console.log(payment_price);
                        return [4 /*yield*/, this.modalController.create({
                                component: UpgradePaymentPackageComponent,
                                componentProps: { value: payment_price }
                            })];
                    case 1:
                        modal = _a.sent();
                        modal.onDidDismiss()
                            .then(function (data) {
                            if (data.data.status == true) {
                                console.log(data.data.status);
                                var pay = {
                                    user_id: _this.dataService.userData.id,
                                    service_id: _this.packages.service_id,
                                    variation_id: variation_id,
                                    current_package_id: _this.packages.current_package_id,
                                    payment_mode: data.data.role,
                                    payment_id: data.data.id,
                                    payment_price: payment_price
                                };
                                console.log(pay);
                                _this.apiService.upgradePackage(pay).subscribe(function (data) {
                                    if (data.status_code == 200) {
                                        _this.ngOnInit();
                                    }
                                    else {
                                        _this.alertService.presentAlert('Alert', data.result);
                                    }
                                }, function (err) {
                                    _this.loadingService.dismiss();
                                    _this.alertService.presentAlert('Alert', 'Something went wrong...');
                                });
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
    PackagesPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    PackagesPage.prototype.services = function () {
        this.navController.navigateForward('servicesSide');
    };
    PackagesPage = __decorate([
        Component({
            selector: 'app-packages',
            templateUrl: './packages.page.html',
            styleUrls: ['./packages.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService, PopoverController, ModalController])
    ], PackagesPage);
    return PackagesPage;
}());
export { PackagesPage };
//# sourceMappingURL=packages.page.js.map