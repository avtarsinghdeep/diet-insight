var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { DataService } from './shared/index';
var AppComponent = /** @class */ (function () {
    function AppComponent(platform, splashScreen, statusBar, dataService, navController) {
        this.platform = platform;
        this.splashScreen = splashScreen;
        this.statusBar = statusBar;
        this.dataService = dataService;
        this.navController = navController;
        this.appPages = [
            { title: 'Dashboard', url: '/tabs', icon: 'home', status: false },
            { title: 'Profile', url: '/myprofile', icon: 'contact', status: false },
            { title: 'Diet Plan', url: '/tabs', icon: 'home', status: false },
            { title: 'Chat', url: '/tabs', icon: 'home', status: false },
            { title: 'Appointment', url: '/tabs', icon: 'home', status: false },
            { title: 'My Package', url: '/packages', icon: 'briefcase', status: false },
            { title: 'Services', url: '/services', icon: 'cog', status: false },
            // {title: 'Abouts me',url: '/aboutme',icon: 'man',status:false},
            { title: 'BMI Calculator', url: '/bmi', icon: 'speedometer', status: false },
            { title: 'Recipes', url: '/recipes', icon: 'pizza', status: false },
            { title: 'Testimonials', url: '/testimonials', icon: 'quote', status: false },
            { title: "FAQ's", url: '/faqs', icon: 'help', status: false },
            { title: 'Contact us', url: '/contactus', icon: 'contact', status: false },
        ];
        this.initializeApp();
    }
    AppComponent.prototype.logout = function () {
        localStorage.clear();
        this.navController.navigateRoot('login');
    };
    AppComponent.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            _this.statusBar.styleLightContent();
            _this.splashScreen.hide();
        });
    };
    AppComponent.prototype.value = function (index) {
        for (var i = 0; i < this.appPages.length; i++) {
            this.appPages[i].status = false;
        }
        this.appPages[index].status = true;
        console.log(this.appPages);
    };
    AppComponent.prototype.set = function () {
        this.dataService.pageType = 'sidemenu';
    };
    AppComponent = __decorate([
        Component({
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.scss'],
        }),
        __metadata("design:paramtypes", [Platform,
            SplashScreen,
            StatusBar,
            DataService,
            NavController])
    ], AppComponent);
    return AppComponent;
}());
export { AppComponent };
//# sourceMappingURL=app.component.js.map