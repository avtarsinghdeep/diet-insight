var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule, } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InternetInterceptor } from './httpconfig.interceptor';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TestComponent } from './test/test.component';
import { ApiService, LoadingService, AlertService, AuthGuard, DataService } from './shared/index';
import { Camera } from '@ionic-native/camera/ngx';
import { FileTransfer } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { PackageUpgradeComponent } from './package-upgrade/package-upgrade.component';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { SharedModule } from './shared.module';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { PayPal } from '@ionic-native/paypal/ngx';
import { DocumentViewer } from '@ionic-native/document-viewer/ngx';
import { SocketIoModule } from 'ng-socket-io';
import { environment } from '../environments/environment';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
//const Prod="http://192.168.31.107:3001"
//const Prod="http://dtlavleen.online:3000"
var config = { url: environment.socketApi, options: {} };
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            declarations: [AppComponent, TestComponent, PackageUpgradeComponent],
            entryComponents: [PackageUpgradeComponent],
            imports: [
                BrowserModule,
                IonicModule.forRoot({ mode: 'md' }),
                AppRoutingModule,
                HttpClientModule,
                FormsModule, SharedModule,
                ReactiveFormsModule,
                SocketIoModule.forRoot(config)
            ],
            providers: [
                StatusBar,
                SplashScreen,
                ApiService,
                LoadingService,
                AlertService,
                AuthGuard,
                DataService,
                CallNumber,
                { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
                Camera,
                FileTransfer,
                File,
                GooglePlus, SocialSharing,
                Facebook, EmailComposer, Device, FCM, InAppBrowser, PhotoViewer, PayPal, DocumentViewer,
                { provide: HTTP_INTERCEPTORS, useClass: InternetInterceptor, multi: true }
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map