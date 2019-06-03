var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from './shared';
var routes = [
    // {path: '',redirectTo: 'home',pathMatch: 'full'},
    { path: '', loadChildren: './tabs/tabs.module#TabsPageModule', canActivate: [AuthGuard] },
    // {path: 'home',loadChildren: './home/home.module#HomePageModule'},
    { path: 'list', loadChildren: './list/list.module#ListPageModule', canActivate: [AuthGuard] },
    { path: 'login', loadChildren: './login/login.module#LoginPageModule' },
    { path: 'signup', loadChildren: './signup/signup.module#SignupPageModule' },
    { path: 'forgot', loadChildren: './forgot/forgot.module#ForgotPageModule' },
    { path: 'forgot-otp', loadChildren: './forgot-otp/forgot-otp.module#ForgotOtpPageModule' },
    { path: 'complete-profile', loadChildren: './complete-profile/complete-profile.module#CompleteProfilePageModule', canActivate: [AuthGuard] },
    { path: 'bmi', loadChildren: './bmi/bmi.module#BmiPageModule', canActivate: [AuthGuard] },
    { path: 'packages', loadChildren: './packages/packages.module#PackagesPageModule', canActivate: [AuthGuard] },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesPageModule', canActivate: [AuthGuard] },
    { path: 'recipe-details', loadChildren: './recipe-details/recipe-details.module#RecipeDetailsPageModule', canActivate: [AuthGuard] },
    { path: 'faqs', loadChildren: './faqs/faqs.module#FaqsPageModule', canActivate: [AuthGuard] },
    { path: 'testimonials', loadChildren: './testimonials/testimonials.module#TestimonialsPageModule', canActivate: [AuthGuard] },
    { path: 'add-testimonials', loadChildren: './add-testimonials/add-testimonials.module#AddTestimonialsPageModule', canActivate: [AuthGuard] },
    { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardPageModule', canActivate: [AuthGuard] },
    // { path: 'mydietplan', loadChildren: './mydietplan/mydietplan.module#MydietplanPageModule' },
    // { path: 'messages', loadChildren: './messages/messages.module#MessagesPageModule' },
    // { path: 'appointments', loadChildren: './appointments/appointments.module#AppointmentsPageModule' },
    { path: 'aboutme', loadChildren: './aboutme/aboutme.module#AboutmePageModule', canActivate: [AuthGuard] },
    { path: 'services', loadChildren: './services/services.module#ServicesPageModule', canActivate: [AuthGuard] },
    { path: 'service-detail', loadChildren: './service-detail/service-detail.module#ServiceDetailPageModule', canActivate: [AuthGuard] },
    { path: 'contactus', loadChildren: './contactus/contactus.module#ContactusPageModule', canActivate: [AuthGuard] },
    { path: 'personal-profile', loadChildren: './personal-profile/personal-profile.module#PersonalProfilePageModule', canActivate: [AuthGuard] },
    { path: 'medical-profile1', loadChildren: './medical-profile1/medical-profile1.module#MedicalProfile1PageModule', canActivate: [AuthGuard] },
    { path: 'medical-profile2', loadChildren: './medical-profile2/medical-profile2.module#MedicalProfile2PageModule', canActivate: [AuthGuard] },
    { path: 'medical-profile3', loadChildren: './medical-profile3/medical-profile3.module#MedicalProfile3PageModule', canActivate: [AuthGuard] },
    { path: 'payment', loadChildren: './payment/payment.module#PaymentPageModule', canActivate: [AuthGuard] },
    { path: 'myprofile', loadChildren: './myprofile/myprofile.module#MyprofilePageModule' }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        NgModule({
            imports: [RouterModule.forRoot(routes, { useHash: true })],
            exports: [RouterModule]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map