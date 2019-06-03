var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, IonContent, MenuController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var ServiceDetailPage = /** @class */ (function () {
    function ServiceDetailPage(apiService, loadingService, dataService, navController, alertService, menuController) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
        this.menuController = menuController;
        this.service = null;
        this.plan = null;
        this.feature_selected = 0;
        this.section = "description";
        if (this.dataService.pageType == "sidemenu") {
            this.menuController.enable(true, 'first');
        }
        else {
            this.menuController.enable(false, 'first');
        }
    }
    ServiceDetailPage.prototype.ngOnInit = function () {
        var _this = this;
        this.service = this.dataService.data;
        this.service_id = this.dataService.data.service_id;
        this.buypack_service_id = localStorage.getItem('buypack_service_id');
        this.has_package = localStorage.getItem('has_package');
        console.log('SERVICES ', this.service_id, this.buypack_service_id);
        console.log('has_package', this.has_package);
        //faq's
        this.apiService.faq_list().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                var p;
                var myArrayFAQ = [];
                for (var i = 0; i < data.result.length; i++) {
                    p = data.result[i];
                    p.FAQSTATUS = false;
                    myArrayFAQ.push(p);
                }
                _this.faqs = myArrayFAQ;
                console.log("faq", _this.faqs);
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
        this.testimonials = this.dataService.data.testimonials;
        console.log("services testimonial data is", this.testimonials);
    };
    ServiceDetailPage.prototype.packageSelect = function (value) {
        var _this = this;
        this.plan = value;
        setTimeout(function () {
            _this.content.scrollToBottom();
        }, 100);
    };
    ServiceDetailPage.prototype.buy = function (plan, index) {
        this.dataService.data.variation_id = plan.variation_id;
        this.dataService.data.variation_index = index;
        this.navController.navigateForward('term-conditions');
        // this.navController.navigateForward('payment');
    };
    ServiceDetailPage.prototype.enableFAQ = function (index, status) {
        for (var i = 0; i < this.faqs.length; i++) {
            this.faqs[i].FAQSTATUS = false;
        }
        if (this.faqs[index].FAQSTATUS == true) {
            this.faqs[index].FAQSTATUS = false;
        }
        else {
            this.faqs[index].FAQSTATUS = true;
        }
        console.log("faqc", this.faqs);
    };
    ServiceDetailPage.prototype.funcicon = function (val) {
        if (val == true) {
            return 'remove';
        }
        else {
            return 'add';
        }
    };
    ServiceDetailPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    ServiceDetailPage.prototype.onTestimonials = function (data) {
        this.dataService.data = data;
        this.navController.navigateForward('service-testimonial-detail');
    };
    __decorate([
        ViewChild(IonContent),
        __metadata("design:type", IonContent)
    ], ServiceDetailPage.prototype, "content", void 0);
    ServiceDetailPage = __decorate([
        Component({
            selector: 'app-service-detail',
            templateUrl: './service-detail.page.html',
            styleUrls: ['./service-detail.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService, MenuController])
    ], ServiceDetailPage);
    return ServiceDetailPage;
}());
export { ServiceDetailPage };
//# sourceMappingURL=service-detail.page.js.map