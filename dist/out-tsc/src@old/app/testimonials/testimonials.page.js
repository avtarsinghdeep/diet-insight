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
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var TestimonialsPage = /** @class */ (function () {
    function TestimonialsPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
    }
    TestimonialsPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.testimonial_list().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                _this.testimonials = data.result;
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    TestimonialsPage.prototype.onTestimonials = function (data) {
        this.dataService.data = data;
        this.navController.navigateForward('testimonial-detail');
    };
    TestimonialsPage.prototype.notification = function () {
        this.navController.navigateForward('notification');
    };
    TestimonialsPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    TestimonialsPage = __decorate([
        Component({
            selector: 'app-testimonials',
            templateUrl: './testimonials.page.html',
            styleUrls: ['./testimonials.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], TestimonialsPage);
    return TestimonialsPage;
}());
export { TestimonialsPage };
//# sourceMappingURL=testimonials.page.js.map