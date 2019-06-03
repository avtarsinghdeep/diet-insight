var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var COLORS;
(function (COLORS) {
    COLORS["GREY"] = "#bfbaba";
    COLORS["GREEN"] = "#76FF03";
    COLORS["YELLOW"] = "#FFCA28";
    COLORS["RED"] = "#DD2C00";
})(COLORS || (COLORS = {}));
var TestimonialDetailPage = /** @class */ (function () {
    function TestimonialDetailPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.stars = [];
        this.ratingChange = new EventEmitter();
    }
    TestimonialDetailPage.prototype.ngOnInit = function () {
        this.testimonials = this.dataService.data;
        console.log(this.testimonials);
        this.stars = this.printRating(this.testimonials.rating);
    };
    TestimonialDetailPage.prototype.getColor = function (index) {
        if (index == 'star-outline') {
            return COLORS.GREY;
        }
        if (this.stars) {
            return COLORS.YELLOW;
        }
    };
    TestimonialDetailPage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    TestimonialDetailPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    TestimonialDetailPage.prototype.printRating = function (rating) {
        var max_rate = 5;
        var rounded_rating = Math.round(rating);
        var array_stars = new Array(max_rate);
        array_stars.fill('star-outline');
        for (var i = 0; i < rounded_rating; i++) {
            array_stars[i] = 'star';
            if (i === rounded_rating - 1 && rating % 1 !== 0) {
                array_stars[i] = 'star-half';
            }
        }
        return array_stars;
    };
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], TestimonialDetailPage.prototype, "rating", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], TestimonialDetailPage.prototype, "ratingChange", void 0);
    TestimonialDetailPage = __decorate([
        Component({
            selector: 'app-testimonial-detail',
            templateUrl: './testimonial-detail.page.html',
            styleUrls: ['./testimonial-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], TestimonialDetailPage);
    return TestimonialDetailPage;
}());
export { TestimonialDetailPage };
//# sourceMappingURL=testimonial-detail.page.js.map