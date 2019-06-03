var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
// import { AdminchatComponent } from './adminchat/adminchat.component';
import { CalendarPage } from './calendar/calendar.page';
import { IonicModule } from '@ionic/angular';
import { AdminchatComponent } from './adminchat/adminchat.component';
import { UpgradePaymentPackageComponent } from './upgrade-payment-package/upgrade-payment-package.component';
import { SelectCountryComponent } from './select-country/select-country.component';
import { SelectStateComponent } from './select-state/select-state.component';
import { SelectCityComponent } from './select-city/select-city.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectMealTypeComponent } from './select-meal-type/select-meal-type.component';
import { SelectMealType1Component } from './select-meal-type1/select-meal-type1.component';
import { SelectWeightComponent } from './select-weight/select-weight.component';
import { SelectWaterComponent } from './select-water/select-water.component';
import { SelectWaterTimeSlotComponent } from './select-water-time-slot/select-water-time-slot.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { MessageImagePopComponent } from './message-image-pop/message-image-pop.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ManualPaymentPopoverComponent } from './manual-payment-popover/manual-payment-popover.component';
import { CountryCodeComponent } from './country-code/country-code.component';
var SharedModule = /** @class */ (function () {
    function SharedModule() {
    }
    SharedModule = __decorate([
        NgModule({
            imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
            entryComponents: [AdminchatComponent, UpgradePaymentPackageComponent, SelectCountryComponent, SelectStateComponent, SelectCityComponent, SelectMealTypeComponent, SelectMealType1Component, SelectWeightComponent,
                SelectWaterComponent,
                SelectWaterTimeSlotComponent, CustomAlertComponent, MessageImagePopComponent, TransactionComponent, ManualPaymentPopoverComponent, CountryCodeComponent],
            declarations: [CalendarPage, AdminchatComponent, UpgradePaymentPackageComponent, SelectCountryComponent, SelectStateComponent, SelectCityComponent, SelectMealTypeComponent, SelectMealType1Component,
                SelectWeightComponent,
                SelectWaterComponent,
                SelectWaterTimeSlotComponent, CustomAlertComponent, MessageImagePopComponent, TransactionComponent, ManualPaymentPopoverComponent, CountryCodeComponent],
            exports: [CalendarPage]
        })
    ], SharedModule);
    return SharedModule;
}());
export { SharedModule };
//# sourceMappingURL=shared.module.js.map