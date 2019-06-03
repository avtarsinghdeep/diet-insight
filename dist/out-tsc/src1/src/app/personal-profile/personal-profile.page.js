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
import { Component, ViewChild } from '@angular/core';
import { NavController, ActionSheetController, Platform, IonSelect } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { Validators, FormBuilder } from '@angular/forms';
import { environment } from '../../environments/environment';
var PersonalProfilePage = /** @class */ (function () {
    function PersonalProfilePage(apiService, transfer, file, camera, platform, formBuilder, loadingService, actionSheetController, dataService, navController, alertService) {
        this.apiService = apiService;
        this.transfer = transfer;
        this.file = file;
        this.camera = camera;
        this.platform = platform;
        this.formBuilder = formBuilder;
        this.loadingService = loadingService;
        this.actionSheetController = actionSheetController;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.img = 'assets/profile-user.png';
        this.country = null;
        this.state = null;
        this.city = null;
        console.log(this.img);
        console.log(this.dataService.userData);
        this.img = this.dataService.userData.profile_image;
        console.log(this.img);
        this.profile = formBuilder.group({
            gender: ['', Validators.compose([Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            address: ['', Validators.compose([Validators.maxLength(50), Validators.minLength(3), Validators.required])],
            country: ['', Validators.compose([Validators.required])],
            state: ['', Validators.compose([Validators.required])],
            city: ['', Validators.compose([Validators.required])],
        });
    }
    PersonalProfilePage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.countries().subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.country = data.result;
            }
            else {
                console.log(data);
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    PersonalProfilePage.prototype.countryChange = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.stateList({ country_id: this.profile.value.country }).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                _this.state = data.result;
                _this.profile.controls.state.setValue(null);
            }
            else {
                _this.alertService.presentAlert('Alert', data.result);
                console.log(data);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
            console.log(err);
        });
    };
    PersonalProfilePage.prototype.stateChange = function () {
        var _this = this;
        if (this.profile.value.state != null) {
            this.profile.controls.city.setValue(null);
            this.loadingService.present();
            this.apiService.cityList({ state_id: this.profile.value.state }).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    _this.city = data.result;
                    _this.profile.controls.city.setValue(null);
                }
                else {
                    _this.alertService.presentAlert('Alert', data.result);
                    console.log(data);
                }
            }, function (err) {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
                console.log(err);
            });
        }
    };
    PersonalProfilePage.prototype.submit = function () {
        var _this = this;
        if (this.profile.valid) {
            var data = __assign({ user_id: this.dataService.userData.id }, this.profile.value);
            this.loadingService.present();
            this.apiService.personal_profile(data).subscribe(function (data) {
                _this.loadingService.dismiss();
                if (data.status_code == 200) {
                    localStorage['userDetail'] = JSON.stringify(data.result);
                    _this.navController.navigateForward('medical-profile1');
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
    PersonalProfilePage.prototype.skip = function () {
        this.navController.navigateForward('medical-profile1');
    };
    PersonalProfilePage.prototype.editProfile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
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
    PersonalProfilePage.prototype.selectImage = function (sourceType) {
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
                saveToPhotoAlbum: false
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
                saveToPhotoAlbum: false
            };
        }
        this.camera.getPicture(options).then(function (imageData) {
            // alert(imageData)
            _this.filePath = imageData;
            _this.upload_pic();
        }, function (err) {
            _this.alertService.presentAlert('Alert', "Something went wrong...");
            // alert(err);
        });
    };
    PersonalProfilePage.prototype.upload_pic = function () {
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
                // console.log(JSON.parse(data.response)['result']['profile_image']);
                _this.dataService.userData.profile_image = JSON.parse(data.response)['result']['profile_image'];
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
    __decorate([
        ViewChild('countryTag'),
        __metadata("design:type", IonSelect)
    ], PersonalProfilePage.prototype, "countryTag", void 0);
    __decorate([
        ViewChild('stateTag'),
        __metadata("design:type", IonSelect)
    ], PersonalProfilePage.prototype, "stateTag", void 0);
    __decorate([
        ViewChild('cityTag'),
        __metadata("design:type", IonSelect)
    ], PersonalProfilePage.prototype, "cityTag", void 0);
    PersonalProfilePage = __decorate([
        Component({
            selector: 'app-personal-profile',
            templateUrl: './personal-profile.page.html',
            styleUrls: ['./personal-profile.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            FileTransfer,
            File,
            Camera,
            Platform,
            FormBuilder,
            LoadingService,
            ActionSheetController,
            DataService,
            NavController,
            AlertService])
    ], PersonalProfilePage);
    return PersonalProfilePage;
}());
export { PersonalProfilePage };
//# sourceMappingURL=personal-profile.page.js.map