import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  NavController,
  IonContent,
  ModalController,
  NavParams,
  PopoverController,Platform,AlertController
} from '@ionic/angular'
import {
  ApiService,
  LoadingService,
  AlertService,
  DataService
} from '../shared/index'
import {
  InAppBrowser,
  InAppBrowserOptions
} from '@ionic-native/in-app-browser/ngx';
import * as sha512 from 'js-sha512';
import { environment } from '../../environments/environment'
import {
  PayPal,
  PayPalPayment,
  PayPalConfiguration
} from '@ionic-native/paypal/ngx';
@Component({
  selector: 'app-upgrade-payment-package',
  templateUrl: './upgrade-payment-package.component.html',
  styleUrls: ['./upgrade-payment-package.component.scss']
})
export class UpgradePaymentPackageComponent implements OnInit {
  selected: number = null;
  payment_mode_save: boolean = true;
  payment_id
  payment_price
  payment_mode
  entry
  payment_price_usd
  service_id
  variation_id
  constructor(public apiService: ApiService,
    public loadingService: LoadingService,
    public dataService: DataService,
    public navController: NavController,
    public alertService: AlertService, public modalCtrl: ModalController, navParams: NavParams, private iab: InAppBrowser, private payPal: PayPal, public popoverController: PopoverController,public platform: Platform,public alertController:AlertController) {
   this.payment_price=navParams.get('payment_price');
   this.payment_price_usd=navParams.get('payment_price_usd');
   this.service_id=navParams.get('service_id');
   this.variation_id=navParams.get('variation_id');
    console.log(this.dataService.userData.country_code, navParams.get('value'));
  }
  ngOnInit() {
    this.entry={}
    this.entry.isChecked=true
    if (this.dataService.userData.payment_mode_save == true || this.dataService.userData.payment_mode_save == 'true') {
      if (this.dataService.userData.payment_mode == 'payu') this.selected = 0;
      if (this.dataService.userData.payment_mode == 'paypal') this.selected = 1;
      if (this.dataService.userData.payment_mode == 'paytm') this.selected = 2;
      if (this.dataService.userData.payment_mode == 'manual') this.selected = 3;
    } else {
    };
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
      this.payubtn(value)
      
    } else if (selected == 1) {
      this.paypalbtn(value);
      
    } else if (selected == 2) {
      this.paytm(value);
    }
    else if(selected==3){
      this.onDismiss(value)
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
    // if (this.selected == 0) {
    //   this.payubtn(value)
      
    // } else if (this.selected == 1) {
    //   this.paypalbtn(value);
      
    // } else if (this.selected == 2) {
    //   this.paytm(value);
    // }
    // else if(this.selected==3){
    //   this.onDismiss(value)
    // }
    //this.savepaymentmethod(value)
  }
  manual(value){
    
  }
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
  paypalbtn(value) {
    var amt=this.payment_price_usd.toString();
    this.payPal.init({
           PayPalEnvironmentProduction: 'AWYdrxIogNzW5kPT_jACliX9Gjnu40d5a-AjKSMS1P0YJcE59n5ecxLmbcds66VODPraspIilTeAYz-7',
      PayPalEnvironmentSandbox: 'ARWjYJw6bnEo8zZPP2_nuBK80w_49AKMPrSG5Uu24Q6AjFD7gCN-nU9a16mS74c4_niiNBvOicuOKpZF'
    }).then(() => {
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({})).then(() => {
        let payment = new PayPalPayment(amt, 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then((success) => {
          console.log("paypal response " + success);
          if (success != null) {
         
            console.log("transaction_id is:" + success.response.id);
            this.payment_id = success.response.id
            this.savepaymentmethod(value);
            this.onDismiss(value)
             //this.successCall(success);
          }
        }, () => {});
      }, () => {});
    }, () => {});
  }

   payubtn(value) {
    let name = this.dataService.userData.firstname;
    let mobile = this.dataService.userData.mobile;
    let email = this.dataService.userData.email;
    var d = new Date();
    var n = d.getTime();
    let bookingId = this.dataService.userData.id + "" + String(Math.floor(Math.random() * (99 - 10 + 1) + 10) + String(1235)) + "" + n;
    this.payment_id = bookingId;
    let productinfo = "Diet-insight Payment";
    let salt = environment.payULivesalt;
    let key = environment.payULivekey;
     let surl = environment.payUsurl;
    let furl = environment.payUfurl;
    let amt = this.payment_price;
    let service_provider = "payu_paisa";
    var string = key + '|' + bookingId + '|' + amt + '|' + productinfo + '|' + name + '|' + email + '|||||||||||' + salt;
    var encrypttext = sha512.sha512(string);
    var url = environment.payUApi+"payuBiz.html?amt=" + amt + "&name=" + name + "&mobileNo=" + mobile + "&email=" + email + "&bookingId=" + bookingId + "&productinfo=" + productinfo + "&hash=" + encrypttext + "&salt=" + salt + "&key=" + key;
    console.log(url);
    console.log("bookingId", bookingId);
    console.log("name", name, "email", email, "mobile", mobile)
    console.log("duration_price_inr", this.payment_price);
    const browser = this.iab.create(url, '_blank');
    if (this.platform.is('android')) {   
    browser.on('loadstop').subscribe(event => {
      console.log("event", event);
      if (event.url == environment.payUsurl) {
        console.log('sucess');
        browser.close();
        this.savepaymentmethod(value);
        this.onDismiss(value);
      }
      if (event.url == environment.payUfurl) {
        console.log('failed')
        browser.close();
      }
    });
  }
  else{
      browser.on('loadstart').subscribe(event => {
      console.log("event", event);
      if (event.url == environment.payUsurl) {
        console.log('sucess');
        browser.close();
        this.savepaymentmethod(value);
        this.onDismiss(value);
      }
      if (event.url == environment.payUfurl) {
        console.log('failed')
        browser.close();
      }
    });
  }
  }
    paytm(value) {

    console.log("service_id", this.service_id);
    console.log("amt_us", this.payment_price_usd);
    console.log("var_id",this.variation_id);
    console.log("amt_inr", this.payment_price);
    var amt_us = this.payment_price_usd
    var service_id = this.service_id;
    var var_id = this.variation_id;
    var amt_inr = this.payment_price
    var user_id = this.dataService.userData.id

    const browser = this.iab.create(environment.paytmApi + '/' + user_id + '/' + service_id + '/' + var_id + '/' + amt_inr + '/' + amt_us+'/'+2, '_blank');
     if (this.platform.is('android')) {
           browser.on('loadstop').subscribe(event => {
      console.log("event", event);
      if (event.url == environment.paytmsfurl) {
        console.log('sucess');
        this.apiService.getPaytmTransactionId({
            user_id: user_id
          })
          .subscribe(data => {
            var a = data.result;
            if (data.status_code == 200) {
              this.payment_id = a.transaction_id
              this.onDismiss(value);
              // this.successCall(this.payment_id);
              //  this.submit();
                 this.savepaymentmethod(value)
            } else {
              this.alertService.presentAlert('Alert', 'Payment failed')
            }
            console.log("data", data);
          }, err => {
            console.log('Alert', 'err')
          })
        browser.close();
      }
    });
     }
       else{
         browser.on('loadstart').subscribe((event) => {
                 console.log("event", event);
      if (event.url == environment.paytmsfurl) {
        console.log('sucess');
        this.apiService.getPaytmTransactionId({
            user_id: user_id
          })
          .subscribe(data => {
            var a = data.result;
            if (data.status_code == 200) {
              this.payment_id = a.transaction_id
              this.onDismiss(value);
                 this.savepaymentmethod(value)
            } else {
              this.alertService.presentAlert('Alert', 'Payment failed')
            }
            console.log("data", data);
          }, err => {
            console.log('Alert', 'err')
          })
        browser.close();
      }
         })
       }
  }
  onDismiss(value) {
    var data = {
      status: true,
      role: value,
      id: this.payment_id
    }
    this.modalCtrl.dismiss(data)
  }
  ondismiss1(){
     var data = {
      status: false,
    }
    this.modalCtrl.dismiss(data)
  }
}

