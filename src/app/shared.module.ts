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
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { SelectMealTypeComponent } from './select-meal-type/select-meal-type.component';
import { SelectMealType1Component } from './select-meal-type1/select-meal-type1.component';
import { SelectWeightComponent } from './select-weight/select-weight.component';
import { SelectWaterComponent } from './select-water/select-water.component';
import { SelectWaterTimeSlotComponent } from './select-water-time-slot/select-water-time-slot.component';
import { CustomAlertComponent } from './custom-alert/custom-alert.component';
import { MessageImagePopComponent } from './message-image-pop/message-image-pop.component';
import { TransactionComponent } from './transaction/transaction.component';
import { ManualPaymentPopoverComponent } from './manual-payment-popover/manual-payment-popover.component';
import {CountryCodeComponent} from './country-code/country-code.component'
@NgModule({
 imports:      [CommonModule,IonicModule,FormsModule,ReactiveFormsModule],
 entryComponents: [ AdminchatComponent,UpgradePaymentPackageComponent,SelectCountryComponent,SelectStateComponent,SelectCityComponent,SelectMealTypeComponent,SelectMealType1Component,SelectWeightComponent,
SelectWaterComponent,
SelectWaterTimeSlotComponent,CustomAlertComponent,MessageImagePopComponent,TransactionComponent,ManualPaymentPopoverComponent,CountryCodeComponent],
 declarations: [ CalendarPage, AdminchatComponent,UpgradePaymentPackageComponent,SelectCountryComponent,SelectStateComponent,SelectCityComponent,SelectMealTypeComponent,SelectMealType1Component,
 SelectWeightComponent,
SelectWaterComponent,
SelectWaterTimeSlotComponent,CustomAlertComponent,MessageImagePopComponent,TransactionComponent,ManualPaymentPopoverComponent,CountryCodeComponent],
 exports:      [ CalendarPage ]
})
export class SharedModule { }