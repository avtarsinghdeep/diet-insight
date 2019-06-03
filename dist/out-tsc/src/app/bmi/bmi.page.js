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
import * as moment from 'moment';
import { PopoverController, AlertController } from '@ionic/angular';
var BmiPage = /** @class */ (function () {
    function BmiPage(popoverController, alertController) {
        this.popoverController = popoverController;
        this.alertController = alertController;
        this.kg = null;
        this.cm = null;
        this.ft = null;
        this.in = null;
        this.bmi = '00.0';
        this.weight_unit = 'kg';
        this.height_unit = 'cm';
        this.options = {
            cssClass: 'alert-md alert-tappable'
        };
    }
    BmiPage.prototype.ngOnInit = function () {
    };
    BmiPage.prototype.check_border = function (value, bmi) {
        if (value == 1) {
            if (bmi <= 16.5) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 2) {
            if (bmi >= 16.5 && bmi <= 18.5) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 3) {
            if (bmi >= 18.5 && bmi <= 25) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 4) {
            if (bmi >= 25 && bmi <= 30) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 5) {
            if (bmi >= 30 && bmi <= 35) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 6) {
            if (bmi >= 35 && bmi <= 40) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
        else if (value == 7) {
            if (bmi >= 40) {
                return 'bolder';
            }
            else {
                return 'normal';
            }
        }
    };
    BmiPage.prototype.getDay = function () {
        return moment().format('MMMM Do YYYY');
    };
    BmiPage.prototype.check_enable = function () {
        if (this.height_unit == 'cm') {
            if (isNaN(this.kg) || isNaN(this.cm) || this.cm <= 1 || this.kg < 1) {
                return true;
            }
            else {
                return false;
            }
        }
        else if (this.height_unit == 'ft') {
            if (isNaN(this.kg) || isNaN(this.ft) || isNaN(this.in) || this.ft < 1 || this.in < 1 || this.kg < 1) {
                return true;
            }
            else {
                return false;
            }
        }
    };
    BmiPage.prototype.check = function () {
        if (this.weight_unit == 'kg') {
            this.check1(this.kg);
        }
        else {
            this.check1(this.kg * 2.20462);
        }
    };
    BmiPage.prototype.check1 = function (value) {
        if (this.height_unit == 'cm') {
            this.check2(value, this.cm);
        }
        else {
            this.check2(value, this.ft * 30.48 + this.in * 2.54);
        }
    };
    BmiPage.prototype.check2 = function (weight, height) {
        this.bmi = ((Math.round((weight / (height / 100 * height / 100)) * 10)) / 10).toString();
    };
    BmiPage.prototype.presentPopover = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: 'faqs',
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
    BmiPage.prototype.presentAlertRadio = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Weight Unit',
                            inputs: [
                                {
                                    name: 'Kg',
                                    type: 'radio',
                                    label: 'Kg',
                                    value: 'kg',
                                    checked: true
                                },
                                {
                                    name: 'lb',
                                    type: 'radio',
                                    label: 'lb',
                                    value: 'lb'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        console.log('Confirm Ok', data);
                                        _this.weight_unit = data;
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
    BmiPage.prototype.openSelecterHeight = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            header: 'Height Unit',
                            inputs: [
                                {
                                    name: 'cm',
                                    type: 'radio',
                                    label: 'cm',
                                    value: 'cm',
                                    checked: true
                                },
                                {
                                    name: 'ft',
                                    type: 'radio',
                                    label: 'ft',
                                    value: 'ft'
                                },
                            ],
                            buttons: [
                                {
                                    text: 'Cancel',
                                    role: 'cancel',
                                    cssClass: 'secondary',
                                    handler: function () {
                                        console.log('Confirm Cancel');
                                    }
                                }, {
                                    text: 'Ok',
                                    handler: function (data) {
                                        console.log('Confirm Ok');
                                        _this.height_unit = data;
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
    BmiPage = __decorate([
        Component({
            selector: 'app-bmi',
            templateUrl: './bmi.page.html',
            styleUrls: ['./bmi.page.scss'],
        }),
        __metadata("design:paramtypes", [PopoverController, AlertController])
    ], BmiPage);
    return BmiPage;
}());
export { BmiPage };
//# sourceMappingURL=bmi.page.js.map