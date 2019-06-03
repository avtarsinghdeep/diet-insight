var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { MedicalProfile2Page } from './medical-profile2.page';
var routes = [
    {
        path: '',
        component: MedicalProfile2Page
    }
];
var MedicalProfile2PageModule = /** @class */ (function () {
    function MedicalProfile2PageModule() {
    }
    MedicalProfile2PageModule = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule,
                IonicModule,
                RouterModule.forChild(routes)
            ],
            declarations: [MedicalProfile2Page]
        })
    ], MedicalProfile2PageModule);
    return MedicalProfile2PageModule;
}());
export { MedicalProfile2PageModule };
//# sourceMappingURL=medical-profile2.module.js.map