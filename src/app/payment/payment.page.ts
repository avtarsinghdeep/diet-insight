import {
  Component,
  OnInit
} from '@angular/core';
import {
  NavController,
  IonContent,
  PopoverController,Platform,MenuController,AlertController
} from '@ionic/angular'
import {
  ApiService,
  LoadingService,
  AlertService,
  DataService
} from '../shared/index';
import {
  environment
} from '../../environments/environment'
import {
  InAppBrowser,
  InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import * as sha512 from 'js-sha512';
import { Router } from '@angular/router';
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from '@ionic-native/paypal/ngx';
import {
  TransactionComponent
} from '../transaction/transaction.component';
import { ManualPaymentPopoverComponent } from '../manual-payment-popover/manual-payment-popover.component';
@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  selected: number = null;
  payment_mode_save;
  entry
  payment_id
  payment_mode
  constructor(public apiService: ApiService,
    public loadingService: LoadingService,
    public dataService: DataService,
    public navController: NavController,
    public alertService: AlertService, private iab: InAppBrowser, private payPal: PayPal, public popoverController: PopoverController,public platform: Platform,private router: Router,private menuController:MenuController,public alertController:AlertController) {
       if (this.dataService.pageType=="sidemenu") {
          this.menuController.enable(true,'first')
        }
        else{
          this.menuController.enable(false,'first')
        }
  }

  ngOnInit() {
    console.log('country code',this.dataService.userData.country_code);
    this.entry = {}
    this.entry.isChecked = true
    if (this.dataService.userData.payment_mode_save == true || this.dataService.userData.payment_mode_save == 'true') {
      if (this.dataService.userData.payment_mode == 'payu') this.selected = 0;
      if (this.dataService.userData.payment_mode == 'paypal') this.selected = 1;
      if (this.dataService.userData.payment_mode == 'paytm') this.selected = 2;
      if (this.dataService.userData.payment_mode == 'manual') this.selected = 3;
    } else {};
  }
    async presentAlertConfirm(selected,value) {
    const alert = await this.alertController.create({
      header: 'Are you sure want to continue?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
             if (selected == 0) {
      this.payubtn(value);
    } else if (selected == 1) {
      this.paypalbtn(value);
    } else if (selected == 2) {
      this.paytm(value);
    } else if(selected==3) {
      //this.submit();
      this.manual(value)
    }
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }

  selectTab(index, value) {
     this.selected = index;
     this.payment_mode = value
    this.presentAlertConfirm(index, value);
  }
 async manual(value){
  const popover = await this.popoverController.create({
      component: ManualPaymentPopoverComponent,
      event: value,
      translucent: true,
      cssClass:"custom-popover-manual"
    });
      popover.onDidDismiss()
      .then((data: any) => {
        
        this.customalert()
       //this.navController.navigateForward("personal-profile");
      })
    return await popover.present();
  }
   async customalert() {
    const alert = await this.alertController.create({
      header: 'Alert!',
      message: 'Your Payment will be approved by Dietitian, after the successful payment from your side.',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {

            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Okay',
          handler: () => {
             this.submit();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  // customalert(){
  //   this.alertService.presentAlert('Alert', 'Your Payment will be approved by Dietitian, after the successful payment from your side.')
  //   this.submit();
  // }
  savepaymentmethod(value) {
    var data = {
      user_id: this.dataService.userData.id,
      payment_mode: value
    }
    console.log(data);
    this.apiService.save_payment_method(data).subscribe(data => {
      this.dataService.userData.payment_mode = value;
      localStorage['userDetail'] = JSON.stringify(this.dataService.userData);
    }, err => {
      console.log(err);
    })
  }
 payubtn(value) {
    console.log("userdata", this.dataService.userData);
    let name = this.dataService.userData.name;
    let mobile = this.dataService.userData.mobile;
    let email = this.dataService.userData.email;
    var d = new Date();
    var n = d.getTime();
    let bookingId = this.dataService.userData.id + "" + String(Math.floor(Math.random() * (99 - 10 + 1) + 10) + String(1235)) + "" + n;
    this.payment_id = bookingId;
    // let productinfo = "this is testing";
    let productinfo = "Diet-insight Payment";
    let salt = environment.payULivesalt;
    let key = environment.payULivekey;
    let amt = this.dataService.data.variation[this.dataService.data.variation_index].duration_price_inr;
    //let amt=5;
    let surl = environment.payUsurl;
    let furl = environment.payUfurl;
    let service_provider = "payu_paisa";
    var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
    var encrypttext = sha512.sha512(string);
    var url = environment.payUApi + "payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&hash=" + encrypttext + "&salt=" + salt + "&key=" + key;
    console.log(url);
    console.log("bookingId", bookingId);
    console.log("name", name, "email", email, "mobile", mobile)
    console.log("duration_price_inr", this.dataService.data.variation[this.dataService.data.variation_index].duration_price_inr);
    const browser = this.iab.create(url, '_blank');
     if (this.platform.is('android')) {
    browser.on('loadstop').subscribe(event => {
      console.log("event",JSON.stringify(event));
      if (event.url == environment.payUsurl) {
        console.log('sucess');
        browser.close();
         this.successCall(this.payment_id);
        this.submit();
        this.savepaymentmethod(value)
      }
      if (event.url == environment.payUfurl) {
        console.log('failed')
        browser.close();
      }
    });
  }
  else{
   console.log("ios");
        browser.on('loadstart').subscribe(event => {
       console.log("loadstartevent",JSON.stringify(event));
       console.log("event",JSON.stringify(event));
      if (event.url == environment.payUsurl) {
        console.log('sucess');
        browser.close();
         this.successCall(this.payment_id);
        this.submit();
        this.savepaymentmethod(value)
      }
      if (event.url == environment.payUfurl) {
        console.log('failed')
        browser.close();
      }
     })
  }
  }
  paypalbtn(value) {
    console.log("paypal call");
    var amt = this.dataService.data.variation[this.dataService.data.variation_index].duration_price_us.toString();
    this.payPal.init({
      PayPalEnvironmentProduction: 'AWYdrxIogNzW5kPT_jACliX9Gjnu40d5a-AjKSMS1P0YJcE59n5ecxLmbcds66VODPraspIilTeAYz-7',
      PayPalEnvironmentSandbox: 'ARWjYJw6bnEo8zZPP2_nuBK80w_49AKMPrSG5Uu24Q6AjFD7gCN-nU9a16mS74c4_niiNBvOicuOKpZF'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentProduction', new PayPalConfiguration({})).then(() => {
        let payment = new PayPalPayment(amt, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((success) => {

          console.log("paypal response " + success);
          if (success != null) {

            this.successCall(success);
            console.log("transaction_id is:" + success.response.id);
            this.payment_id = success.response.id
            this.submit();
             this.savepaymentmethod(value);
          }
        }, () => {

        });
      }, () => {});
    }, () => {});
  }

  paytm(value) {
    console.log("service_id", this.dataService.data.service_id);
    console.log("amt_us", this.dataService.data.variation[this.dataService.data.variation_index].duration_price_us);
    console.log("var_id", this.dataService.data.variation_id);
    console.log("amt_inr", this.dataService.data.variation[this.dataService.data.variation_index].duration_price_inr);
    var amt_us = this.dataService.data.variation[this.dataService.data.variation_index].duration_price_us;
    var service_id = this.dataService.data.service_id;
    var var_id = this.dataService.data.variation_id;
    var amt_inr = this.dataService.data.variation[this.dataService.data.variation_index].duration_price_inr
    var user_id = this.dataService.userData.id
   console.log("link",environment.paytmApi + '/' + user_id + '/' + service_id + '/' + var_id + '/' + amt_inr + '/' + amt_us+'/'+1);
    const browser = this.iab.create(environment.paytmApi + '/' + user_id + '/' + service_id + '/' + var_id + '/' + amt_inr + '/' + amt_us+'/'+1, '_blank','location=yes');
      if (this.platform.is('android')) {
      console.log("android");

    browser.on('loadstop').subscribe(event => {
      console.log("event",JSON.stringify(event.url));
       console.log("event1",JSON.stringify(event.url));
      if (event.url == environment.paytmsfurl) {
        console.log('sucess');
        this.apiService.getPaytmTransactionId({
            user_id: user_id
          })
          .subscribe(data => {
            var a = data.result;
            if (data.status_code == 200) {
              this.payment_id = a.transaction_id
              this.successCall(this.payment_id);
               this.submit();
                this.savepaymentmethod(value)
            } else {
              this.alertService.presentAlert('Alert', 'Payment failed')
            }
            console.log("data", data);
          }, err => {
            console.log('Alert', 'err')
          })
        browser.close();
      }else{
        console.log("false");
      }
    });
    }
    else{
      console.log("ios");
        browser.on('loadstart').subscribe((e) => {
     let compareURL = environment.paytmsfurl;
      if (e.url == compareURL) {
        console.log('sucess');
        this.apiService.getPaytmTransactionId({
            user_id: user_id
          })
          .subscribe(data => {
            var a = data.result;
            if (data.status_code == 200) {
              this.payment_id = a.transaction_id
              this.successCall(this.payment_id);
               this.submit();
                this.savepaymentmethod(value)
            } else {
              this.alertService.presentAlert('Alert', 'Payment failed')
            }
            console.log("data", data);
          }, err => {
            console.log('Alert', 'err')
          })
        browser.close();
      }else{
        console.log("false");
      }
     console.log('loadstart',e.url);
    }, err => {
          console.error('loadstarterr',err);
    });
    }
  
  }

  async successCall(ev: any) {
    const popover = await this.popoverController.create({
      component: TransactionComponent,
      event: ev,
      translucent: true
    });
    popover.onDidDismiss()
      .then((data: any) => {
        console.log(data);
        if (data.data.status == true) {
          console.log(data);
         // this.navController.navigateForward("personal-profile");
          if (this.dataService.pageType == 'sidemenu') {
            
          }
            else{
              this.router.navigateByUrl('/personal-profile');
            }
            
        } else {
          console.log('false');
        }
      });
    return await popover.present();
  }


  submit() {
    console.log(this.entry.isChecked);
    var data = {
      variation_id: this.dataService.data.variation_id,
      service_id: this.dataService.data.service_id,
      user_id: this.dataService.userData.id,
      payment_mode: this.payment_mode,
      payment_mode_save: this.entry.isChecked,
      payment_id: this.payment_id
    }
    this.loadingService.present();
    this.apiService.buy_package(data).subscribe(data => {
      this.loadingService.dismiss()
      if (data.status_code == 200) {
        console.log(this.dataService.pageType)
        if (this.dataService.pageType == 'sidemenu') {
          this.navController.navigateForward('tabs');
        } else {
          this.navController.navigateForward('personal-profile');
        }
      } else {
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss()
      this.alertService.presentAlert('Alert', 'Something went wrong...')
    })
    console.log()
  }
  info() {
    this.navController.navigateForward('help');
  }
}