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
import { ModalController } from '@ionic/angular';
import { Component, ViewChild } from '@angular/core';
import { IonContent, ActionSheetController, Platform } from '@ionic/angular';
import { ApiService, DataService, AlertService } from '../shared/index';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { environment } from '../../environments/environment';
var AdminchatComponent = /** @class */ (function () {
    function AdminchatComponent(modalController, actionSheetController, apiService, dataService, alertService, transfer, file, camera, platform) {
        this.modalController = modalController;
        this.actionSheetController = actionSheetController;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.transfer = transfer;
        this.file = file;
        this.camera = camera;
        this.platform = platform;
        this.chatOn = true;
        this.id = this.dataService.userData.id;
    }
    AdminchatComponent.prototype.ionViewDidLeave = function () {
        this.chatOn = false;
        console.log("leave admin", this.chatOn);
    };
    AdminchatComponent.prototype.show = function () {
        this.chatUpdate = this.chats;
    };
    AdminchatComponent.prototype.ngOnInit = function () {
        var _this = this;
        var user_id = {
            user_id: this.dataService.userData.id
        };
        this.apiService.chatlist(user_id).subscribe(function (data) {
            if (data.status_code == 200) {
                if (_this.length == data.result.length) {
                    console.log('equal');
                    _this.chats = data.result.reverse();
                    setTimeout(function () {
                        if (_this.chatOn) {
                            _this.ngOnInit();
                        }
                    }, 5000);
                }
                else {
                    console.log(' not equal');
                    _this.chats = data.result.reverse();
                    _this.show();
                    setTimeout(function () {
                        if (_this.chatOn) {
                            _this.content.scrollToBottom(100);
                            _this.ngOnInit();
                        }
                    }, 5000);
                }
                _this.length = data.result.length;
                console.log(data.result.length);
            }
            else {
            }
        }, function (err) {
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    AdminchatComponent.prototype.onAttachment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.actionSheetController.create({
                            header: 'Albums',
                            buttons: [{
                                    text: 'Load from Library',
                                    role: 'Library',
                                    icon: 'images',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.PHOTOLIBRARY);
                                        console.log('Library clicked');
                                    }
                                }, {
                                    text: 'Use Camera',
                                    icon: 'camera',
                                    handler: function () {
                                        _this.selectImage(_this.camera.PictureSourceType.CAMERA);
                                        console.log('Camera clicked');
                                    }
                                }, {
                                    text: 'File',
                                    icon: 'folder',
                                    handler: function () {
                                        _this.fileInput.nativeElement.click();
                                        console.log('File clicked');
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
    AdminchatComponent.prototype.selectImage = function (sourceType) {
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
            _this.filePath = imageData;
            _this.upload_pic();
        }, function (err) {
            _this.alertService.presentAlert('Alert', "Something went wrong...");
        });
    };
    AdminchatComponent.prototype.upload_pic = function () {
        var _this = this;
        var fileTransfer = this.transfer.create();
        var options = {
            fileKey: 'message',
            headers: {},
            chunkedMode: false,
            params: {
                sender_id: this.dataService.userData.id,
                receiver_id: 1
            }
        };
        fileTransfer.upload(this.filePath, environment.apiUrl + "/send_attachment", options)
            .then(function (data) {
            if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
                console.log("success");
            }
            else if (JSON.parse(data.response)['status_code'] == 200) {
                _this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
            }
            else {
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
            }
        }, function (err) {
            _this.alertService.presentAlert('Alert1', 'Something went wrong...');
            console.log(err);
        });
    };
    AdminchatComponent.prototype.processWebImage = function (event) {
        var _this = this;
        var reader = new FileReader();
        reader.onload = function (readerEvent) {
            _this.imageData = readerEvent.target.result;
            console.log(_this.imageData);
        };
        reader.readAsDataURL(event.target.files[0]);
        if (event.target.files.length > 0) {
            console.log("f", event.target.files[0]);
            var input = new FormData();
            input.append('sender_id', this.dataService.userData.id);
            input.append('receiver_id', 1);
            input.append('message', event.target.files[0]);
            this.apiService.filesend(input)
                .subscribe(function (data) {
                console.log(data);
            }, function (err) {
                _this.alertService.presentAlert('Alert1', 'Something went wrong...');
                console.log(err);
            });
        }
    };
    AdminchatComponent.prototype.getImg = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'png' || a[a.length - 1] == 'jpeg' || a[a.length - 1] == 'jpg') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.getdoc = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'doc' || a[a.length - 1] == 'docx') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.getpdf = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'pdf') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.openFile = function (val) {
        console.log(val);
        window.open(val);
    };
    AdminchatComponent.prototype.onDismiss = function () {
        this.modalController.dismiss();
    };
    AdminchatComponent.prototype.onSend = function (message) {
        var _this = this;
        if (message == undefined || message == 'undefined' || message == '' || message.trim() == '' || message.trim() == undefined) {
            console.log("m", message);
        }
        else {
            var a = {
                message: message,
                sender_id: this.dataService.userData.id,
                receiver_id: 1
            };
            this.apiService.adminchat(a).subscribe(function (data) {
                if (data.status_code == 200) {
                    _this.ngOnInit();
                    _this.message = "";
                }
                else { }
            }, function (err) {
                _this.alertService.presentAlert('Alert', 'Something went wrong...');
            });
        }
    };
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], AdminchatComponent.prototype, "content", void 0);
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", Object)
    ], AdminchatComponent.prototype, "fileInput", void 0);
    AdminchatComponent = __decorate([
        Component({
            selector: 'app-adminchat',
            templateUrl: './adminchat.component.html',
            styleUrls: ['./adminchat.component.scss']
        }),
        __metadata("design:paramtypes", [ModalController, ActionSheetController, ApiService, DataService, AlertService, FileTransfer,
            File,
            Camera,
            Platform])
    ], AdminchatComponent);
    return AdminchatComponent;
}());
export { AdminchatComponent };
//# sourceMappingURL=adminchat.component.js.map