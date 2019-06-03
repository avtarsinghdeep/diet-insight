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
import { Component, NgZone, ViewChild } from '@angular/core';
import { Platform, NavController, MenuController, PopoverController, IonRouterOutlet, AlertController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService, AlertService } from './shared/index';
import { Router, NavigationStart } from '@angular/router';
import { FCM } from '@ionic-native/fcm/ngx';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
var AppComponent = /** @class */ (function () {
    function AppComponent(router, menuController, platform, splashScreen, statusBar, dataService, navController, fcm, zone, alertService, popoverController, google, facebook, alertController) {
        var _this = this;
        this.router = router;
        this.menuController = menuController;
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.dataService = dataService;
        this.navController = navController;
        this.fcm = fcm;
        this.zone = zone;
        this.alertService = alertService;
        this.popoverController = popoverController;
        this.google = google;
        this.facebook = facebook;
        this.alertController = alertController;
        this.profile_img = 'assets/profile-user.png';
        this.appPages = [
            {
                title: 'Dashboard',
                url: '/tabs',
                icon: 'home',
                status: false
            },
            {
                title: 'My Package',
                url: '/packages',
                icon: 'briefcase',
                status: false
            },
            {
                title: 'My Files',
                url: '/downloads-files',
                icon: 'cloud-download',
                status: false
            },
            {
                title: 'Recipes',
                url: '/recipes',
                icon: 'pizza',
                status: false
            },
            {
                title: 'Services',
                url: '/servicesSide',
                icon: 'cog',
                status: false
            },
            {
                title: 'Testimonials',
                url: '/testimonials',
                icon: 'quote',
                status: false
            },
            {
                title: 'Settings',
                url: '/setting',
                icon: 'cog',
                status: false
            },
            {
                title: "FAQ's",
                url: '/faqs',
                icon: 'help',
                status: false
            },
            {
                title: 'Contact us',
                url: '/contactus',
                icon: 'contact',
                status: false
            }
        ];
        this.fcm.subscribeToTopic('dietinsight');
        this.initializeApp();
        this.ImageCheck();
        router.events.subscribe(function (val) {
            if (val instanceof NavigationStart) {
                if (val.url == '/login' || val.url == '/signup' ||
                    val.url == '/forgot' || val.url == '/services' ||
                    val.url == '/forgot-otp') {
                    _this.menuController.enable(false, 'first');
                }
                else {
                    _this.menuController.enable(true, 'first');
                }
            }
        });
        this.platform.backButton.subscribeWithPriority(0, function () {
            if (_this.routerOutlet && _this.routerOutlet.canGoBack()) {
                _this.routerOutlet.pop();
            }
            else if (_this.router.url === '/tabs/messages' || _this.router.url === '/tabs/mydietplan' || _this.router.url === '/tabs/appointments' || _this.router.url === '/tabs/notification') {
                console.log("yes");
                _this.navController.navigateForward('/tabs/home');
                //this.routerOutlet.pop();
            }
            else if (_this.router.url === '/tabs/home' || _this.router.url == 'personal-profile') {
                // this.platform.exitApp(); 
                _this.presentAlert();
                // or if that doesn't work, try
                //  navigator['app'].exitApp();
            }
            else {
                console.log('inn another page WONT EXIT THE APP!');
                //this.routerOutlet.pop();
                _this.presentAlert();
            }
        });
    }
    AppComponent.prototype.presentAlert = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Do you want to exit the app?',
                            buttons: [{
                                    text: 'Ok',
                                    role: 'Ok',
                                    handler: function () {
                                        console.log('OK clicked');
                                        navigator['app'].exitApp();
                                    }
                                },
                                {
                                    text: 'Cancel',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
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
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () {
            //console.log(this.dataService.tabPage);
            _this.ngOnInit();
        }, 5000);
    };
    AppComponent.prototype.presentAlertLogout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var alert;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.alertController.create({
                            message: 'Do you really want to Logout?',
                            buttons: [{
                                    text: 'Yes',
                                    role: 'Ok',
                                    handler: function () {
                                        console.log('Yes clicked');
                                        localStorage.clear();
                                        _this.dataService.userData = '';
                                        _this.dataService.pageType = '';
                                        _this.dataService.tabPage = '';
                                        _this.facebook.logout();
                                        _this.google.logout();
                                        localStorage.clear();
                                        _this.navController.navigateRoot('login');
                                    }
                                },
                                {
                                    text: 'No',
                                    handler: function () {
                                        console.log('Cancel clicked');
                                    }
                                }]
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
    AppComponent.prototype.logout = function () {
        this.presentAlertLogout();
    };
    AppComponent.prototype.ImageCheck = function () {
        var _this = this;
        setTimeout(function () {
            _this.ImageCheck();
            if (localStorage['profile_img'] == '' || localStorage['profile_img'] == "" || localStorage['profile_img'] == 'undefined' || localStorage['profile_img'] == undefined) {
                _this.profile_img = "assets/profile-user.png";
            }
            else {
                _this.profile_img = localStorage['profile_img'];
            }
            _this.user_name = localStorage['user_name'];
            //console.log('profile_img', localStorage['profile_img']);
        }, 10000);
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            if (_this.platform.is('android')) {
                _this.dataService.platform = 'android';
            }
            else if (_this.platform.is('ios')) {
                _this.dataService.platform = 'ios';
            }
            console.log("platform", _this.dataService.platform);
            //this.customAlert('title', 'Lorem ipsum is a dummy text.', 'gfdfd')
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
            _this.fcm.onNotification().subscribe(function (data) {
                console.log(data);
                if (data.wasTapped) {
                    console.log("Received in background");
                    if (data.identify == 'offer') {
                        _this.navController.navigateForward('servicesSide');
                    }
                    else if (data.identify == 'appointment') {
                        _this.navController.navigateForward('/tabs/appointments');
                    }
                    else if (data.identify == 'weight') {
                        _this.dataService.mealtypePage = '3';
                        _this.navController.navigateForward('addmeal');
                    }
                    else if (data.identify == 'meal') {
                        _this.dataService.mealtypePage = '1';
                        _this.navController.navigateForward('addmeal');
                    }
                    else if (data.identify == 'Dietchart' || data.identify == 'DietChart') {
                        _this.navController.navigateForward('/tabs/mydietplan');
                    }
                    else if (data.identify == 'water_intake') {
                        _this.dataService.mealtypePage = '2';
                        _this.navController.navigateForward('addmeal');
                    }
                    else if (data.identify == 'message') {
                        _this.navController.navigateForward('/tabs/messages');
                    }
                }
                else {
                    console.log("Received in foreground");
                    if (data.identify == 'offer') {
                        _this.customAlert(data.title, data.body, 'offer');
                        // this.alertService.presentAlert('Alert', data.result);
                    }
                    else if (data.identify == 'appointment') {
                        _this.customAlert(data.title, data.body, 'appointment');
                        //  this.navController.navigateForward('/tabs/appointments');
                    }
                    else if (data.identify == 'weight') {
                        _this.customAlert(data.title, data.body, 'weight');
                        //  this.dataService.mealtypePage='3'
                        // this.navController.navigateForward('addmeal');
                    }
                    else if (data.identify == 'meal') {
                        _this.customAlert(data.title, data.body, 'meal');
                        // this.dataService.mealtypePage='1'
                        //this.navController.navigateForward('addmeal');
                    }
                    else if (data.identify == 'Dietchart' || data.identify == 'DietChart') {
                        _this.customAlert(data.title, data.body, 'Dietchart');
                        //this.navController.navigateForward('/tabs/mydietplan');
                    }
                    else if (data.identify == 'water_intake') {
                        _this.customAlert(data.title, data.body, 'water_intake');
                        // code...
                    }
                    else if (data.identify == 'newsletter') {
                        _this.customAlert(data.title, data.body, 'newsletter');
                    }
                    else if (data.identify == 'message') {
                        //this.navController.navigateForward('/tabs/messages');
                        console.log("tabPage", _this.dataService.tabPage);
                        if (_this.dataService.tabPage == "messages" || _this.dataService.tabPage == 'messages') {
                        }
                        else {
                            _this.customAlert(data.title, data.body, 'message');
                        }
                    }
                }
                ;
            });
        });
    };
    AppComponent.prototype.set = function () { };
    AppComponent.prototype.value = function (index) {
        this.dataService.pageType = 'sidemenu';
        for (var i = 0; i < this.appPages.length; i++) {
            this.appPages[i].status = false;
        }
        this.appPages[index].status = true;
        console.log(this.appPages);
    };
    AppComponent.prototype.customAlert = function (title, msg, type) {
        return __awaiter(this, void 0, void 0, function () {
            var popover;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.popoverController.create({
                            component: CustomAlertComponent,
                            componentProps: {
                                title: title,
                                msg: msg,
                                type: type
                            },
                            translucent: true,
                            cssClass: 'custom-popover'
                        })];
                    case 1:
                        popover = _a.sent();
                        popover.onDidDismiss()
                            .then(function (data) {
                            if (data.data.status == true) {
                                console.log(data);
                                if (data.data.type == 'offer') {
                                    _this.navController.navigateForward('servicesSide');
                                }
                                else if (data.data.type == 'appointment') {
                                    _this.navController.navigateForward('/tabs/appointments');
                                }
                                else if (data.data.type == 'weight') {
                                    _this.dataService.mealtypePage = '3';
                                    _this.navController.navigateForward('addmeal');
                                }
                                else if (data.data.type == 'meal') {
                                    _this.dataService.mealtypePage = '1';
                                    _this.navController.navigateForward('addmeal');
                                }
                                else if (data.data.type == 'Dietchart') {
                                    _this.navController.navigateForward('/tabs/mydietplan');
                                }
                                else if (data.data.type == 'water_intake') {
                                    _this.dataService.mealtypePage = '2';
                                    _this.navController.navigateForward('addmeal');
                                }
                                else if (data.data.type == 'message') {
                                    _this.navController.navigateForward('/tabs/messages');
                                }
                            }
                            else {
                                console.log('false');
                            }
                        });
                        return [4 /*yield*/, popover.present()];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    __decorate([
        ViewChild(IonRouterOutlet),
        __metadata("design:type", IonRouterOutlet)
    ], AppComponent.prototype, "routerOutlet", void 0);
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
        }),
        __metadata("design:paramtypes", [Router,
            MenuController,
            Platform,
            SplashScreen,
            StatusBar,
            DataService,
            NavController,
            FCM, NgZone, AlertService, PopoverController, GooglePlus,
            Facebook, AlertController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
// public appPages = [
//   {
//     title: 'Dashboard',
//     url: '/tabs',
//     icon: 'home',
//     status: false
//   },
//   {
//     title: 'Profile',
//     url: '/tabs/myprofile',
//     icon: 'contact',
//     status: false
//   },
//   {
//     title: 'Chat',
//     url: '/tabs/messages',
//     icon: 'chatboxes',
//     status: false
//   },
//   {
//     title: 'Diet Plan',
//     url: '/tabs/mydietplan',
//     icon: 'paper',
//     status: false
//   },
//   {
//     title: 'Appointment',
//     url: '/tabs/appointments',
//     icon: 'calendar',
//     status: false
//   },
//   {
//     title: 'My Package',
//     url: '/packages',
//     icon: 'briefcase',
//     status: false
//   },
//   {
//     title: 'Recipes',
//     url: '/recipes',
//     icon: 'pizza',
//     status: false
//   },
//   {
//     title: 'Services',
//     url: '/servicesSide',
//     icon: 'cog',
//     status: false
//   },
//   {
//     title: 'Testimonials',
//     url: '/testimonials',
//     icon: 'quote',
//     status: false
//   },
//   {
//     title: "FAQ's",
//     url: '/faqs',
//     icon: 'help',
//     status: false
//   },
//   {
//     title: 'Contact us',
//     url: '/contactus',
//     icon: 'contact',
//     status: false
//   },
// ];
//# sourceMappingURL=app.component.js.map