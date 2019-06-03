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
import { NavController } from '@ionic/angular';
import { FormBuilder } from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DataService } from '../shared/index';
var ContactusPage = /** @class */ (function () {
    function ContactusPage(dataService, formBuilder, emailComposer, callNumber, navController) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        this.emailComposer = emailComposer;
        this.callNumber = callNumber;
        this.navController = navController;
    }
    ContactusPage.prototype.ngOnInit = function () {
    };
    ContactusPage.prototype.onCall = function (val) {
        this.callNumber.callNumber(val, true)
            .then(function (res) { return console.log('Launched dialer!', res); })
            .catch(function (err) { return console.log('Error launching dialer', err); });
    };
    ContactusPage.prototype.onSendEmail = function (val) {
        console.log(val);
        var email = {
            to: val,
        };
        this.emailComposer.open(email);
    };
    ContactusPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    ContactusPage.prototype.onDisclaimer = function () {
        this.dataService.tabPage = "contactus";
        this.navController.navigateForward('term-conditions');
    };
    ContactusPage = __decorate([
        Component({
            selector: 'app-contactus',
            templateUrl: './contactus.page.html',
            styleUrls: ['./contactus.page.scss'],
        }),
        __metadata("design:paramtypes", [DataService, FormBuilder, EmailComposer, CallNumber, NavController])
    ], ContactusPage);
    return ContactusPage;
}());
export { ContactusPage };
//# sourceMappingURL=contactus.page.js.map