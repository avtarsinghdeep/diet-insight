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
import { IonContent, ActionSheetController, Platform, PopoverController } from '@ionic/angular';
import { ApiService, DataService, AlertService } from '../shared/index';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { environment } from '../../environments/environment';
import { ServiceService } from '../service.service';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
var AdminchatComponent = /** @class */ (function () {
    function AdminchatComponent(photoViewer, service, modalController, iab, actionSheetController, apiService, dataService, alertService, transfer, camera, platform, popoverController, socket) {
        var _this = this;
        this.photoViewer = photoViewer;
        this.service = service;
        this.modalController = modalController;
        this.iab = iab;
        this.actionSheetController = actionSheetController;
        this.apiService = apiService;
        this.dataService = dataService;
        this.alertService = alertService;
        this.transfer = transfer;
        this.camera = camera;
        this.platform = platform;
        this.popoverController = popoverController;
        this.socket = socket;
        this.messages = [];
        this.nickname = '';
        this.chatOn = true;
        this.last = true;
        this.user_online = false;
        this.attachment = "primary";
        this.primary = "primary";
        this.id = this.dataService.userData.id;
        console.log('get user data on admin chat', this.dataService.userData);
        this.nickname = this.dataService.userData.firstname;
        // var sender_id = this.dataService.userData.user_id;
        var sender_id = this.dataService.userData.id;
        this.sender_id = parseInt(sender_id);
        var room_id = this.sender_id + "" + 1;
        this.room_id = parseInt(room_id);
        //this.sendMessage();
        console.log(this.sender_id);
        console.log('room_id', this.room_id);
        this.getMessages()
            .subscribe(function (message) {
            console.log(message);
            _this.messages.push(message);
            setTimeout(function () {
                _this.content.scrollToBottom();
            }, 1000);
        });
        this.getUsers().subscribe(function (data) {
            console.log(data);
            var c = data;
            var user = data['user'];
            if (data['event'] === 'left') {
                console.log('User left: ' + user);
                //    if (c.idArray.length>0) {
                //   var online_id=c.idArray.filter(arg=>arg==1);
                //   if (online_id.length>0) {
                //     console.log("online")
                //     this.user_online=true
                //   }
                //   else{
                //      console.log("offline");
                //      this.user_online=false
                //   }
                // }
            }
            else {
                console.log('User joined: ' + user);
                // if (c.idArray.length>0) {
                //   var online_id=c.idArray.filter(arg=>arg==1);
                //   if (online_id.length>0) {
                //     console.log("online")
                //      this.user_online=true
                //   }
                //   else{
                //      console.log("offline");
                //       this.user_online=false
                //   }
                // }
            }
        });
        this.getUsersonline().subscribe(function (data) {
            console.log(data);
            var c = data;
            var user = data['user'];
            if (data['event'] == 'offline' || data['event'] == "offline") {
                console.log('User offline: ' + user);
                if (c.idArray.length > 0) {
                    var online_id = c.idArray.filter(function (arg) { return arg == 1; });
                    if (online_id.length > 0) {
                        console.log("online");
                        _this.user_online = true;
                    }
                    else {
                        console.log("offline");
                        _this.user_online = false;
                    }
                }
                else {
                    _this.user_online = false;
                }
            }
            else if (data['event'] == 'online' || data['event'] == "online") {
                console.log('User online: ' + user);
                if (c.idArray.length > 0) {
                    var online_id = c.idArray.filter(function (arg) { return arg == 1; });
                    if (online_id.length > 0) {
                        console.log("online");
                        _this.user_online = true;
                    }
                    else {
                        console.log("offline");
                        _this.user_online = false;
                    }
                }
                else {
                    _this.user_online = false;
                }
            }
        });
        //this.getAllMessage();
    }
    AdminchatComponent.prototype.ngOnInit = function () {
    };
    AdminchatComponent.prototype.ionViewDidEnter = function () {
        this.user = {
            room_id: this.room_id,
            sender_id: this.sender_id
        };
        var j = {
            nickname: this.nickname,
            id: this.sender_id,
            event: "joined"
        };
        var online = {
            id: this.sender_id,
            nickname: this.nickname,
            event: "online"
        };
        console.log("j", j);
        console.log("user", this.user);
        // Connected, let's sign-up for to receive messages for this room
        this.socket.emit('set-nickname', j);
        this.socket.emit('room join', this.user);
        this.socket.emit('set-online', online);
        this.getsocketMessage();
    };
    // getAllMessage() {
    //   this.socket.emit('sendToAll', {
    //     room_id: 123,
    //     sender_id: this.sender_id
    //   });
    // }
    AdminchatComponent.prototype.sendMessage = function () {
        var _this = this;
        console.log(this.message);
        var msg = this.message;
        if (msg == undefined || msg == "undefined" || msg == 'undefined' || msg == '') {
            console.log("if", msg);
        }
        else {
            console.log("else");
            msg = msg.trim();
            console.log(msg);
            if (msg == '' || msg == "" || msg == null || msg == "null") {
                console.log("null");
            }
            else {
                console.log("not null");
                this.primary = "tertiary";
                setTimeout(function () {
                    _this.primary = "primary";
                }, 2000);
                this.socket.emit('add-message', {
                    name: this.nickname,
                    room_id: this.room_id,
                    message: msg,
                    receiver_id: 1,
                    sender_id: this.sender_id,
                    types: 1
                });
                this.message = '';
            }
        }
    };
    // getMessagesAll() {
    //   let observable = new Observable(observer => {
    //     this.socket.on('message1', (data) => {
    //       console.log("message1", data)
    //       observer.next(data);
    //     });
    //   })
    //   return observable;
    // }
    AdminchatComponent.prototype.getsocketMessage = function () {
        var _this = this;
        var a = {
            room_id: this.room_id,
            sender_id: this.sender_id
        };
        this.apiService.getsocketMessage(a)
            .subscribe(function (data) {
            console.log("getsocketMessage", data);
            _this.messages = data.data;
            setTimeout(function () {
                _this.content.scrollToBottom();
            }, 1000);
        }, function (err) {
            console.log('Alert', 'Something went wrong...');
        });
    };
    AdminchatComponent.prototype.getMessages = function () {
        var _this = this;
        return Observable.create(function (observer) {
            _this.socket.on('message', function (message) {
                observer.next(message);
            });
        });
    };
    AdminchatComponent.prototype.getUsers = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            _this.socket.on('users-changed', function (data) {
                console.log("users-changed", data);
                observer.next(data);
            });
        });
        return observable;
    };
    AdminchatComponent.prototype.getUsersonline = function () {
        var _this = this;
        var observable = new Observable(function (observer) {
            _this.socket.on('users-online', function (data) {
                console.log("users-online", data);
                observer.next(data);
            });
        });
        return observable;
    };
    AdminchatComponent.prototype.ionViewWillLeave = function () {
        console.log("leave");
        var j = {
            nickname: this.nickname,
            id: this.sender_id,
            event: "left"
        };
        // Connected, let's sign-up for to receive messages for this room
        this.socket.emit('set-nickname', j);
        var online = {
            id: this.sender_id,
            nickname: this.nickname,
            event: "offline"
        };
        this.socket.emit('set-online', online);
        //this.socket.disconnect();
    };
    AdminchatComponent.prototype.onAttachment = function () {
        return __awaiter(this, void 0, void 0, function () {
            var actionSheet;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.attachment = "tertiary";
                        return [4 /*yield*/, this.actionSheetController.create({
                                buttons: [{
                                        text: 'Camera',
                                        icon: 'camera',
                                        handler: function () {
                                            _this.selectImage(_this.camera.PictureSourceType.CAMERA);
                                        }
                                    },
                                    //  {
                                    //   text: 'Gallery',
                                    //   icon: 'image',
                                    //   handler: () => {
                                    //     this.selectImage(this.camera.PictureSourceType.PHOTOLIBRARY);
                                    //   }
                                    // },
                                    {
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
                                            _this.attachment = "primary";
                                            console.log('Cancel clicked');
                                        }
                                    }
                                ]
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
                saveToPhotoAlbum: false,
                correctOrientation: true
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
                correctOrientation: true
            };
        }
        console.log(options);
        console.log(this.platform.is('android'));
        this.camera.getPicture(options).then(function (imageData) {
            console.log("imageData", imageData);
            _this.uploadPhoto(imageData);
            _this.image = window.Ionic.WebView.convertFileSrc(imageData);
            console.log(_this.image);
        }, function (err) {
            console.log('err', err);
        });
    };
    AdminchatComponent.prototype.uploadPhoto = function (imageFileUri) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                window.resolveLocalFileSystemURL(imageFileUri, function (entry) {
                    entry['file'](function (file) { return _this.readFile(file); });
                });
                return [2 /*return*/];
            });
        });
    };
    AdminchatComponent.prototype.readFile = function (file) {
        var _this = this;
        console.log('imageFile is', file);
        this.slice = file.slice(0, 100000);
        console.log('SLICE IMAGE DATA: ', this.slice);
        console.log("file_name", file.name.split('.').pop());
        var extension = file.name.split('.').pop();
        if (extension == "pdf" || extension == "doc" || extension == "docx" || extension == "png" || extension == "jpeg" || extension == "jpg" || extension == "PDF" || extension == "DOC" || extension == "DOCX" || extension == "PNG" || extension == "JPEG" || extension == "JPG") {
            var reader_1 = new FileReader();
            var files = {}, struct = {
                name: null,
                type: null,
                size: 0,
                data: [],
                slice: 0,
            };
            if (!files[file.name]) {
                files[file.name] = Object.assign({}, struct, file);
                files[file.name].data = [];
            }
            //convert the ArrayBuffer to Buffer
            // file = new Buffer(new Uint8Array(file));
            // console.log('inn uploading data images' + JSON.stringify(data.data));
            //save the data
            files[file.name].data.push(file);
            files[file.name].slice++;
            if (files[file.name].slice * 100000 >= files[file.name].size) {
                reader_1.readAsArrayBuffer(file);
                console.log('innn SLICE !!!!!', this.slice);
                reader_1.onload = function (evt) {
                    _this.reader_result = reader_1.result;
                    console.log('READER RESULT IS', evt);
                    // alert(this.reader_result);
                    _this.socket.emit('slice upload', {
                        data: file,
                        name: file.name,
                        type: file.type,
                        size: file.size,
                        room_id: _this.room_id,
                        receiver_id: 1,
                        types: 2,
                        sender_id: _this.sender_id,
                    });
                    setTimeout(function () {
                        _this.attachment = "primary";
                    }, 5000);
                    // this.postData(this.datata);
                    console.log('inn file name', file.name + ' ' + file.type);
                };
            }
            else {
                console.log('request slice upload');
            }
        }
        else {
            this.alertService.presentAlert('Alert', 'Format not accepted!');
            this.attachment = "primary";
        }
    };
    AdminchatComponent.prototype.processWebImage = function (ev) {
        console.log('pdf event is:', ev);
        this.file = ev.target.files[0];
        console.log('inn PDF file name ', this.file);
        this.readFile(this.file);
    };
    AdminchatComponent.prototype.onDismiss = function () {
        this.modalController.dismiss();
    };
    AdminchatComponent.prototype.ionViewDidLeave = function () {
        this.chatOn = false;
        console.log("leave admin", this.chatOn);
    };
    //   show() {
    //     this.chatUpdate = this.chats;
    //   }
    //   ngOnInit() {
    //     var user_id = {
    //       user_id: this.dataService.userData.id
    //     }
    //     this.apiService.chatlist(user_id).subscribe(data => {
    //       if (data.status_code == 200) {
    //         if (this.length == data.result.length) {
    //           console.log('equal');
    //           this.chats = data.result.reverse();
    //           setTimeout(() => {
    //             if (this.chatOn) {
    //               this.ngOnInit();
    //             }
    //           }, 10000);
    //         } else {
    //           console.log(' not equal');
    //           this.chats = data.result.reverse();
    //           this.show();
    //           setTimeout(() => {
    //             if (this.chatOn) {
    //               this.content.scrollToBottom(100)
    //               this.ngOnInit();
    //             }
    //           }, 5000);
    //         }
    //         this.length = data.result.length
    //         console.log(data.result.length);
    //       } else {
    //       }
    //     }, err => {
    //       this.alertService.presentAlert('Alert', 'Something went wrong...')
    //     })
    //   }
    //   upload_pic() {
    //     var fileTransfer: FileTransferObject = this.transfer.create();
    //     let options: FileUploadOptions = {
    //       fileKey: 'message',
    //       headers: {},
    //       chunkedMode: false,
    //       params: {
    //         sender_id: this.dataService.userData.id,
    //         receiver_id: 1
    //       }
    //     }
    //     fileTransfer.upload(this.filePath, `${environment.apiUrl}/send_attachment`, options)
    //       .then((data) => {
    //         if (data.responseCode == 200 && JSON.parse(data.response)['status_code'] == 200) {
    //           console.log("success");
    //         } else if (JSON.parse(data.response)['status_code'] == 200) {
    //           this.alertService.presentAlert('Alert', JSON.parse(data.response)['result']);
    //         } else {
    //           this.alertService.presentAlert('Alert', 'Something went wrong...')
    //         }
    //       }, (err) => {
    //         this.alertService.presentAlert('Alert1', 'Something went wrong...')
    //         console.log(err);
    //       })
    //   }
    //   processWebImage(event) {
    //     let reader = new FileReader();
    //     reader.onload = (readerEvent) => {
    //       this.imageData = (readerEvent.target as any).result;
    //       console.log(this.imageData);
    //     };
    //     reader.readAsDataURL(event.target.files[0]);
    //     if (event.target.files.length > 0) {
    //       console.log("f", event.target.files[0]);
    //       let input: any = new FormData();
    //       input.append('sender_id', this.dataService.userData.id);
    //       input.append('receiver_id', 1);
    //       input.append('message', event.target.files[0]);
    //       this.apiService.filesend(input)
    //         .subscribe((data) => {
    //           console.log(data);
    //         }, (err) => {
    //           this.alertService.presentAlert('Alert1', 'Something went wrong...')
    //           console.log(err);
    //         })
    //     }
    //   }
    AdminchatComponent.prototype.getImg = function (val) {
        //console.log('image data ', val);
        var a = val.split('.');
        if (a[a.length - 1] == 'png' || a[a.length - 1] == 'jpeg' || a[a.length - 1] == 'jpg' || a[a.length - 1] == 'PNG' || a[a.length - 1] == 'JPEG' || a[a.length - 1] == 'JPG') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.getdoc = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'doc' || a[a.length - 1] == 'docx' || a[a.length - 1] == 'DOC' || a[a.length - 1] == 'DOCX') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.getpdf = function (val) {
        var a = val.split('.');
        if (a[a.length - 1] == 'pdf' || a[a.length - 1] == 'PDF') {
            return true;
        }
        else {
            return false;
        }
    };
    AdminchatComponent.prototype.openFile = function (val) {
        console.log(val);
        var browser = this.iab.create(val, '_system');
        //  window.open(val);
    };
    //   onDismiss() {
    //     this.modalController.dismiss();
    //   }
    //   onSend(message) {
    //     if (message == undefined || message == 'undefined' || message == '' || message.trim() == '' || message.trim() == undefined) {
    //       console.log("m", message)
    //     } else {
    //       var a = {
    //         message: message,
    //         sender_id: this.dataService.userData.id,
    //         receiver_id: 1
    //       }
    //       this.apiService.adminchat(a).subscribe(data => {
    //         if (data.status_code == 200) {
    //           this.ngOnInit();
    //           this.message = "";
    //         } else {}
    //       }, err => {
    //         this.alertService.presentAlert('Alert', 'Something went wrong...')
    //       })
    //     }
    //   }
    AdminchatComponent.prototype.openImage = function (ev) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.photoViewer.show(ev);
                return [2 /*return*/];
            });
        });
    };
    AdminchatComponent.prototype.SpltFunc = function (val) {
        var a = val.split(environment.socketApi + '/images/');
        //var a = val.split('http://192.168.31.107:3001/images/');
        return a[1];
    };
    AdminchatComponent.prototype.ionFocus = function () {
        var _this = this;
        console.log("ionFocus call");
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 1000);
    };
    AdminchatComponent.prototype.valueReplace = function (str) {
        var str1 = str.replace(/(?:\r\n|\r|\n)/g, '<br>');
        return str1;
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
        __metadata("design:paramtypes", [PhotoViewer, ServiceService, ModalController, InAppBrowser, ActionSheetController, ApiService, DataService, AlertService, FileTransfer,
            Camera,
            Platform, PopoverController, Socket])
    ], AdminchatComponent);
    return AdminchatComponent;
}());
export { AdminchatComponent };
//# sourceMappingURL=adminchat.component.js.map