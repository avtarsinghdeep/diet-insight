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
import { NavController, ActionSheetController, Platform, AlertController } from '@ionic/angular';
import * as moment from 'moment';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { environment } from '../../environments/environment';
// import { Socket } from 'ng-socket-io';
var HomePage = /** @class */ (function () {
    function HomePage(apiService, loadingService, dataService, navController, alertController, alertService, iab, platform, actionSheetCtrl, transfer, file, camera) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertController = alertController;
        this.alertService = alertService;
        this.iab = iab;
        this.platform = platform;
        this.actionSheetCtrl = actionSheetCtrl;
        this.transfer = transfer;
        this.file = file;
        this.camera = camera;
        this.valueActive = 0;
        this.length = 0;
        this.CustomArray = [];
        this.dashboardOn = true;
        this.firstTime = true;
        console.log(this.dataService.userData);
        localStorage['profile_img'] = this.dataService.userData.profile_image;
        console.log(this.dataService.userData.profile_image);
        localStorage['user_name'] = this.dataService.userData.firstname;
        // this.socket.emit('set-nickname', this.dataService.userData.firstname);
    }
    HomePage.prototype.ngOnInit = function () {
        var _this = this;
        // console.log('hasPACKAGE', this.has_package);
        // console.log("ionViewDidEnter");
        // console.log('tabs Home ', this.dataService.tabPage);
        setTimeout(function () {
            // if (this.dataService.tabPage == "home") {
            _this.ngOnInit();
            if (_this.has_package) {
                // console.log("val",this.dataService.dashboard_nav);
                if (_this.dataService.dashboard_nav) {
                    _this.ionViewDidEnter();
                }
                _this.dataService.dashboard_nav = false;
            }
            // }
        }, 5000);
        // if(window.localStorage.getItem('login_type').match('form')){
        //   console.log('LOGIN TYPE', window.localStorage.getItem('login_type'));
        //   setTimeout(() => {
        //     if (this.dataService.tabPage == "home") {
        //       this.ngOnInit();
        //     }
        //     this.ionViewDidEnter();
        //   }, 10000)
        // }
        // else{
        //   console.log('LOGIN TYPE', window.localStorage.getItem('login_type'));
        // }
    };
    HomePage.prototype.profile = function () {
        this.navController.navigateForward('myprofile');
    };
    HomePage.prototype.ionViewDidLeave = function () {
        this.dashboardOn = false;
        console.log("leave dashboard", this.dashboardOn);
    };
    HomePage.prototype.onRefresh = function () {
        //this.firstTime=true;
        this.loadingService.present();
        this.loadingService.dismiss();
        this.ionViewDidEnter();
    };
    HomePage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //console.log('ionViewDidEnter Data is:',this.dataService.userData);
        //console.log("firstTime", this.firstTime)
        if (this.firstTime) {
            this.loadingService.present();
        }
        this.apiService.dashboard({
            user_id: this.dataService.userData.id
        }).subscribe(function (data) {
            if (_this.firstTime) {
                _this.loadingService.dismiss();
            }
            _this.firstTime = false;
            if (data.status_code == 200) {
                _this.has_package = data.result.has_package;
                localStorage['has_package'] = _this.has_package;
                console.log("has_package", _this.has_package);
                //////////// has package false means user don't have any package////
                //////////has expires true means user package expired///////////////
                if (_this.has_package) {
                    if (!data.result.has_expire) {
                        localStorage['buypack_service_id'] = data.result.service_id;
                        _this.dashboard = data.result;
                        _this.dietchart = data.result.dietchart.meal;
                        _this.dataService.dietician_name = data.result.dietician_name;
                        console.log('ON BREAK', data.result.on_break);
                        _this.onBreak = data.result.on_break;
                        _this.water_intake = data.result.water_intake;
                        _this.weight_tracker = data.result.weight_tracker;
                        _this.average1 = _this.weight_tracker.average.toFixed(3);
                        if (_this.average1.split(".")[1] == 0) {
                            _this.average = parseFloat(_this.weight_tracker.average);
                        }
                        else {
                            _this.average = parseFloat(_this.weight_tracker.average).toFixed(3);
                        }
                        // this.average = this.weight_tracker.average.toFixed(3);
                        localStorage['userDetail'] = JSON.stringify(data.result.user_data);
                        _this.dataService.userData = data.result.user_data;
                        localStorage['profile_img'] = _this.dataService.userData.profile_image;
                        if (data.result.appointment.length == 0) {
                            _this.appointment_length = 0;
                        }
                        _this.appointment = data.result.appointment;
                        // console.log('APOOOOOOO', data.result.appointment);
                        _this.appointment_length = data.result.appointment.length;
                        //console.log(this.dietchart);
                        if (data.result.dietchart.meal) {
                            for (var i = 0; i < _this.dietchart.length; i++) {
                                // console.log(this.dietchart[i]);
                                var value = _this.dietchart[i];
                                if (value.time) {
                                    if (new Date(moment(value.time, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.time, 'hh:mm A').format())) {
                                        //console.log("plus", this.valueActive++);
                                        _this.CustomArray.push(_this.dietchart[i]);
                                        _this.length = _this.CustomArray.length;
                                    }
                                    else {
                                        // console.log("minus", this.valueActive--);
                                    }
                                }
                                else {
                                    if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.mealTimeFrom, 'hh:mm A').format())) {
                                        console.log("plus", _this.valueActive++);
                                        _this.CustomArray.push(_this.dietchart[i]);
                                        _this.length = _this.CustomArray.length;
                                    }
                                    else {
                                        // console.log("minus", this.valueActive--);
                                    }
                                }
                                // console.log('length', this.length);
                            }
                        }
                        else {
                            _this.length = 0;
                        }
                    }
                    else {
                        console.log("package expire");
                        _this.alertService.presentAlert('Alert', "Your package has been expired");
                        localStorage['has_package'] = 'false';
                        _this.navController.navigateRoot('services');
                    }
                }
                else {
                    _this.navController.navigateRoot('services');
                }
                // setTimeout(() => {
                //    if (this.dashboardOn) {
                //   this.firstTime = false
                //   this.ngOnInit();
                //    }
                // }, 20000);
            }
            else if (data.status_code == 401) {
                localStorage.clear();
                _this.dataService.userData = '';
                _this.dataService.pageType = '';
                _this.dataService.tabPage = '';
                _this.loadingService.dismiss();
                "";
                _this.navController.navigateRoot('login');
                _this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            if (_this.firstTime) {
                _this.loadingService.dismiss();
            }
            _this.firstTime = false;
            // this.alertService.presentAlert('Alert', 'Something went wrong...')
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
        if (value.time) {
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
        }
        else {
            if (value.mealTimeFrom != null || value.mealTimeFrom != '' || value.mealTimeFrom != undefined) {
                if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) > new Date() && new Date(moment().add(60, 'minutes').format()) > new Date(moment(value.mealTimeFrom, 'hh:mm A').format())) {
                    return false;
                }
                else {
                    return true;
                }
            }
            else {
                if (new Date(moment(value.mealTimeFrom, 'hh:mm A').add(30, 'minutes').format()) < new Date()) {
                    return true;
                }
                else {
                    return false;
                }
            }
        }
    };
    HomePage.prototype.open = function () {
        alert(this.CustomArray);
    };
    HomePage.prototype.editProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetCtrl.create({
                            buttons: [{
                                    text: 'Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.CAMERA);
                                    }
                                }, {
                                    text: 'Gallery',
                                    icon: 'image',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                    }
                                }, {
                                    text: 'Cancel',
                                    icon: 'close',
                                    role: 'cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
                        })];
                    case 1:
                        actionSheet = _a.sent();
                        return [4 /*yield*/, actionSheet.present()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    HomePage.prototype.selectImage = function (sourceType) {
        var _this = this;
        var options;
        if (this.platform.is('ios')) {
            options = {
                quality: 50,
                destinationType: this.camera.DestinationType.NATIVE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: sourceType,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            };
        }
        else if (this.platform.is('android')) {
            options = {
                quality: 50,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: sourceType,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false,
                correctOrientation: true
            };
        }
        else {
            options = {
                quality: 50,
                destinationType: this.camera.DestinationType.FILE_URI,
                encodingType: this.camera.EncodingType.JPEG,
                mediaType: this.camera.MediaType.PICTURE,
                sourceType: sourceType,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false,
                correctOrientation: true,
            };
        }
        this.camera.getPicture(options).then(function (imageData) {
            // alert(imageData)
            _this.filePath = imageData;
            _this.upload_pic();
        }, function (err) {
            //this.alertService.presentAlert('Alert', "Something went wrong...");
            // alert(err);
        });
    };
    HomePage.prototype.upload_pic = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'image',
            headers: {},
            chunkedMode: false,
            mimeType: "image/jpg",
        };
        fileTransfer.upload(this.filePath, environment.apiUrl + "/update_profile_image/" + this.dataService.userData.id, options)
            .then(function (data) {
            if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
                _this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
                console.log("pr", _this.dataService.userData);
                localStorage['profile_img'] = JSON.parse(data.response)['result']['profile_image'];
                console.log(localStorage['profile_img']);
            }
            else if (JSON.parse(data.response)['status_code'] == 200) {
                _this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
            }
            else {
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
            }
        }, function (err) {
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            // alert(JSON.stringify(err))
            console.log(err);
        });
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
            NavController, AlertController, AlertService, InAppBrowser, Platform, ActionSheetController, FileTransfer,
            File,
            Camera])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.page.js.map