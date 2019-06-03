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
import { NavParams, PopoverController, } from '@ionic/angular';
import { LoadingService } from '../shared/index';
var SelectStateComponent = /** @class */ (function () {
    function SelectStateComponent(loadingService, viewController, navParams) {
        this.loadingService = loadingService;
        this.viewController = viewController;
        this.navParams = navParams;
        //  console.log(this.navParams.get('states'));
        // this.main_data=this.navParams.get('states')
        // this.states=this.navParams.get('states')
        //   setInterval(()=>{
        //    var a = localStorage['popoverStatus']
        //    if(a==0||a=='0'){
        //        localStorage['popoverStatus']=1;
        //        this.viewController.dismiss();
        //    }
        //  },2000);
        this.loadingService.present();
    }
    SelectStateComponent.prototype.ionViewDidEnter = function () {
        var _this = this;
        console.log(this.navParams.get('states'));
        this.main_data = this.navParams.get('states');
        this.states = this.navParams.get('states');
        setInterval(function () {
            var a = localStorage['popoverStatus'];
            if (a == 0 || a == '0') {
                localStorage['popoverStatus'] = 1;
                _this.viewController.dismiss();
            }
        }, 2000);
        this.loadingService.dismiss();
    };
    SelectStateComponent.prototype.onInput = function (value) {
        var _this = this;
        // console.log(value)
        if (this.myInput == null || this.myInput == '') {
            this.states = this.main_data;
        }
        else {
            if (this.myInput && this.myInput.trim() != '') {
                this.states = this.main_data.filter(function (item) {
                    return (item.name.toLowerCase().indexOf(_this.myInput.toLowerCase()) > -1);
                });
            }
        }
    };
    SelectStateComponent.prototype.onCancel = function (value) {
    };
    SelectStateComponent.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SelectCountryPage');
    };
    SelectStateComponent.prototype.cancel = function () {
        console.log(this.state);
        this.viewController.dismiss();
    };
    SelectStateComponent.prototype.check = function () {
        if (this.state != null && this.state != '') {
            var data = {
                status: true,
                data: this.state.toLowerCase(),
                state_id: this.state_id
            };
            this.viewController.dismiss(data);
        }
        else {
            this.viewController.dismiss();
        }
    };
    SelectStateComponent.prototype.ngOnInit = function () {
    };
    SelectStateComponent.prototype.stateChange = function (val) {
        this.state = val.name;
        this.state_id = val.state_id;
    };
    __decorate([
        ViewChild('fileInput'),
        __metadata("design:type", Object)
    ], SelectStateComponent.prototype, "fileInput", void 0);
    SelectStateComponent = __decorate([
        Component({
            selector: 'app-select-state',
            templateUrl: './select-state.component.html',
            styleUrls: ['./select-state.component.scss']
        }),
        __metadata("design:paramtypes", [LoadingService, PopoverController, NavParams])
    ], SelectStateComponent);
    return SelectStateComponent;
}());
export { SelectStateComponent };
//# sourceMappingURL=select-state.component.js.map