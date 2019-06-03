var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './data.service';
import { MenuController } from '@ionic/angular';
var AuthGuard = /** @class */ (function () {
    function AuthGuard(menu, router, dataService) {
        this.menu = menu;
        this.router = router;
        this.dataService = dataService;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('isLoggedIn')) {
            var data = localStorage['userData'];
            this.dataService.userData = JSON.parse(localStorage['userDetail']);
            if (localStorage['profile_img'] == undefined || localStorage['profile_img'] == 'undefined') {
                this.dataService.userData.profile_image = 'assets/profile-user.png';
            }
            else {
                this.dataService.userData.profile_image = localStorage['profile_img'];
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard.prototype.canActivateChild = function () {
        if (localStorage.getItem('isLoggedIn')) {
            var data = localStorage['userData'];
            this.dataService.userData = JSON.parse(localStorage['userDetail']);
            if (localStorage['profile_img'] == undefined || localStorage['profile_img'] == 'undefined') {
                this.dataService.userData.profile_image = 'assets/profile-user.png';
            }
            else {
                this.dataService.userData.profile_image = localStorage['profile_img'];
            }
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    AuthGuard = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [MenuController, Router, DataService])
    ], AuthGuard);
    return AuthGuard;
}());
export { AuthGuard };
//# sourceMappingURL=auth.guard.js.map