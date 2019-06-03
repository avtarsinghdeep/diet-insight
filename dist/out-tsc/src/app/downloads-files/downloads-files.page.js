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
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { NavController, ToastController, Platform } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
var DownloadsFilesPage = /** @class */ (function () {
    //items = ['item 1', 'item 2', 'item 3', 'item 4', 'item 5']
    function DownloadsFilesPage(socialSharing, transfer, file, iab, navController, loadingService, dataService, alertService, apiService, toastController, platform) {
        this.socialSharing = socialSharing;
        this.transfer = transfer;
        this.file = file;
        this.iab = iab;
        this.navController = navController;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.apiService = apiService;
        this.toastController = toastController;
        this.platform = platform;
        this.value = "2";
    }
    DownloadsFilesPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        // this.dataService.userData.id
        var a = {
            room_id: this.dataService.userData.id + "" + 1
        };
        this.loadingService.present();
        this.apiService.getFiles(a).subscribe(function (data) {
            _this.loadingService.dismiss();
            if (data.status_code == 200) {
                var b = data.data;
                var c = b.filter(function (arg) { return arg.sender_id == _this.dataService.userData.id; });
                if (c.length > 0) {
                    _this.sent_file = c;
                    console.log("C", c);
                }
                var d = b.filter(function (arg) { return arg.sender_id != _this.dataService.userData.id; });
                if (d.length > 0) {
                    _this.recieved_file = d;
                    console.log("D", d);
                }
                console.log("data", _this.sent_file);
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
    DownloadsFilesPage.prototype.onView = function (val, index) {
        var _this = this;
        console.log("view");
        this.preview = index;
        this.buttonColor = '#c72228';
        setTimeout(function () {
            _this.buttonColor = "";
        }, 5000);
        var browser = this.iab.create(val, '_system');
    };
    DownloadsFilesPage.prototype.onView1 = function (val, index) {
        var _this = this;
        console.log("view");
        this.preview1 = index;
        this.buttonColor1 = '#c72228';
        setTimeout(function () {
            _this.buttonColor1 = "";
        }, 5000);
        var browser = this.iab.create(val, '_system');
    };
    DownloadsFilesPage.prototype.onDownload1 = function (index, file, filename) {
        var _this = this;
        // https://devdactic.com/html/5-simple-hacks-LBT.pdf
        this.download1 = index;
        this.downloadbuttonColor = '#c72228';
        setTimeout(function () {
            _this.downloadbuttonColor = "";
        }, 5000);
        var downloadUrl = encodeURI(file);
        var path = '';
        var dir_name = 'DietInsight'; // directory to download - you can also create new directory
        var file_name = filename; //any file name you like
        var file_saved;
        if (this.platform.is('android')) {
            file_saved = this.file.externalRootDirectory;
        }
        else {
            file_saved = this.file.documentsDirectory;
        }
        var fileTransfer = this.transfer.create();
        var result = this.file.createDir(file_saved, dir_name, true);
        result.then(function (resp) {
            path = resp.toURL();
            console.log(path);
            _this.percIndex1 = index;
            fileTransfer.onProgress(function (progressEvent) {
                console.log(progressEvent);
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                console.log('perc', perc);
                _this.perc1 = perc;
            });
            fileTransfer.download(downloadUrl, path + file_name).then(function (entry) {
                console.log('download complete: ' + entry.toURL());
                if (_this.platform.is('ios')) {
                    _this.socialSharing.share("Share" + file_name, "Share" + file_name, entry.toURL(), "").then(function () {
                        console.log("shareSheetShare: Success");
                    }).catch(function () {
                        console.error("shareSheetShare: failed");
                    });
                }
                else {
                    _this.presentToastWithOptions(entry.toURL());
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log('error on creating path : ' + err);
        });
    };
    DownloadsFilesPage.prototype.onDownload = function (index, file, filename) {
        var _this = this;
        // https://devdactic.com/html/5-simple-hacks-LBT.pdf
        this.download = index;
        this.downloadbuttonColor = '#c72228';
        setTimeout(function () {
            _this.downloadbuttonColor = "";
        }, 5000);
        var downloadUrl = file;
        var path = '';
        var dir_name = 'DietInsight'; // directory to download - you can also create new directory
        var file_name = filename; //any file name you like
        var file_saved;
        if (this.platform.is('android')) {
            file_saved = this.file.externalRootDirectory;
        }
        else {
            file_saved = this.file.documentsDirectory;
        }
        var fileTransfer = this.transfer.create();
        var result = this.file.createDir(file_saved, dir_name, true);
        result.then(function (resp) {
            path = resp.toURL();
            console.log(path);
            _this.percIndex = index;
            fileTransfer.onProgress(function (progressEvent) {
                console.log(progressEvent);
                var perc = Math.floor(progressEvent.loaded / progressEvent.total * 100);
                console.log('perc', perc);
                _this.perc = perc;
            });
            fileTransfer.download(downloadUrl, path + file_name).then(function (entry) {
                console.log('download complete: ' + entry.toURL());
                if (_this.platform.is('ios')) {
                    _this.socialSharing.share("Share" + file_name, "Share" + file_name, entry.toURL(), "").then(function () {
                        console.log("shareSheetShare: Success");
                    }).catch(function () {
                        console.error("shareSheetShare: failed");
                    });
                }
                else {
                    _this.presentToastWithOptions(entry.toURL());
                }
            }, function (error) {
                console.log(error);
            });
        }, function (err) {
            console.log('error on creating path : ' + err);
        });
    };
    DownloadsFilesPage.prototype.presentToastWithOptions = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var toast;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.toastController.create({
                            message: 'File Download Successfully! ' + url,
                            duration: 2000,
                            position: "top"
                        })];
                    case 1:
                        toast = _a.sent();
                        toast.present();
                        return [2 /*return*/];
                }
            });
        });
    };
    DownloadsFilesPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    DownloadsFilesPage.prototype.getImg = function (val) {
        //console.log('image data ', val);
        var a = val.split('.');
        if (a[a.length - 1] == 'png' || a[a.length - 1] == 'jpeg' || a[a.length - 1] == 'jpg' || a[a.length - 1] == 'PNG' || a[a.length - 1] == 'JPEG' || a[a.length - 1] == 'JPG') {
            return true;
        }
        else {
            return false;
        }
    };
    DownloadsFilesPage.prototype.getdoc = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'doc' || a[a.length - 1] == 'docx' || a[a.length - 1] == 'DOC' || a[a.length - 1] == 'DOCX') {
            return true;
        }
        else {
            return false;
        }
    };
    DownloadsFilesPage.prototype.getpdf = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'pdf' || a[a.length - 1] == 'PDF') {
            return true;
        }
        else {
            return false;
        }
    };
    DownloadsFilesPage.prototype.SegmentFunc = function (event) {
        console.log("ev", event);
        this.ionViewDidEnter();
    };
    DownloadsFilesPage = __decorate([
        Component({
            selector: 'app-downloads-files',
            templateUrl: './downloads-files.page.html',
            styleUrls: ['./downloads-files.page.scss'],
        }),
        __metadata("design:paramtypes", [SocialSharing, FileTransfer,
            File, InAppBrowser, NavController, LoadingService,
            DataService,
            AlertService, ApiService, ToastController, Platform])
    ], DownloadsFilesPage);
    return DownloadsFilesPage;
}());
export { DownloadsFilesPage };
//# sourceMappingURL=downloads-files.page.js.map