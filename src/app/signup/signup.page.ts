import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService } from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { NavController,Platform,LoadingController, PopoverController } from '@ionic/angular';
import {country_code} from '../country_code';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { CountryCodeComponent } from '../country-code/country-code.component';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  code: any[] = null;
  c_code = []
  user: {
    firstName: string;lastName: string;email: string;country_code: string;phoneNo: string;password: string;confirmPassword: string;
  } = {
    firstName: null,
    lastName: null,
    email: null,
    country_code: null,
    phoneNo: null,
    password: null,
    confirmPassword: null
  };
  signup_form: FormGroup;
  customOptions: any = {
    header: 'Country code'
  };
  loading: any;
  flag: any;
  device_id
  device_token
  img
  myInput
  dial_code
  state_selected
  constructor(
    public loadCtrl: LoadingController,
    public platform: Platform,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    public apiService: ApiService,
    public dataService: DataService,
    public alertService: AlertService, private device: Device, private fcm: FCM, public popoverController: PopoverController) {
    this.dataService.pageType == ''
    let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    let name=/^[a-zA-Z0-9]+(?:[ _.-][a-z0-9]+)*$/
    // let phoneValidation=/^\+?\d+$/
    let phoneValidation=/^[1-9a-zA-Z][0-9a-zA-Z]*$/
    //let phoneRegex=/^(?:[1-9]\d*|0)$/;
    // '[a-zA-Z]* in first and last name'
    this.signup_form = formBuilder.group({
      firstName: ['', Validators.compose([Validators.required, Validators.pattern(name), Validators.maxLength(25), Validators.minLength(3)])],
      lastName: ['', Validators.compose([Validators.required, Validators.pattern(name), Validators.maxLength(25), Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      //country_code: ['', Validators.compose([Validators.required])],
      phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6),Validators.pattern(phoneValidation)])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.required])]
    });
   //this.signup_form.controls.country_code.setValue('+91');
    this.user.country_code = '+91';
    this.img = environment.apiUrl+'/flags/in.svg';
  }
//   change(event){
//    var num = event;
// var digits = num.toString().split('');
// var realDigits = digits.map(Number)
// console.log(realDigits)
// console.log(realDigits[0])
//     if (event!=null) {
//       if (event==0) {
//       }
//       else{
//       }
//     }
//   }
  ionViewDidLoad() {}
  login() {
    this.navCtrl.navigateForward('login');
  }
  ionViewDidEnter() {}
  ngOnInit() {
    setTimeout(() => {
      console.log('loaded')
      this.c_code = country_code;
      console.log("country code",this.c_code);
      this.checkFlag()
    }, 1000)
    if (this.platform.is('cordova')) {
      console.log('Device UUID is: ' + this.device.uuid);
      this.device_id = this.device.uuid
      this.fcm.getToken().then(token => {
        console.log(token);
        this.device_token = token;
      });
    } else {
      this.device_id = 'dsdsdsds'
      this.device_token = 'dsdddsfsdsds';
    }
  }
  checkFlag() {
    this.flag = this.c_code.filter((a) => {
     // return this.signup_form.value.country_code == a.dial_code
     return this.user.country_code== a.dial_code;
    })[0].img;
  }
  sort() {
    return this.c_code.sort((a: any, b: any) => {
      return a.dial_code - b.dial_code
    })
  }
  signup() {
    console.log(this.user.country_code);
    console.log(this.signup_form);
    if (this.signup_form.value.confirmPassword != this.signup_form.value.password) {
      this.alertService.presentAlert('Alert', "Password doesn't match")
    } else if (this.signup_form.valid) {
        var datasign = {
          firstname: this.user.firstName,
          lastname: this.user.lastName,
          email: this.user.email,
          mobile: this.user.phoneNo,
          country_code: this.user.country_code,
          password: this.user.password,
          device_id: this.device_id,
          device_token: this.device_token
        }
         this.loadingService.present();
      this.apiService.sendRegisterOtp({country_code:this.user.country_code,mobile:this.user.phoneNo,type:'signup', email: this.user.email}).subscribe(data => {
        if (data.status_code == 200) {
           this.dataService.signupDATA=datasign
           console.log('innn otp signup data', this.dataService.signupDATA);
           this.dataService.otpValue=data.result.otp;
          this.loadingService.dismiss();
           this.navCtrl.navigateRoot('signup-otp');
          this.alertService.presentAlert('Alert', 'Verification code is sent to your mobile number.')
        } else {
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Something went wrong...')
      })
     
    } else {
      this.alertService.presentAlert('Alert', 'Please fill all the details')
    }
  }


  async SelectCountryCode() {
    console.log('codes');
    let alert = await this.popoverController.create({
        component: CountryCodeComponent,
        componentProps: {
            codes: this.c_code
        },
        cssClass:'custom-popover'
    });
    alert.onDidDismiss().then((data) => {
        console.log("codeeee after",data);
        this.state_selected = data;
        this.img = this.state_selected.data.code_image;
        this.dial_code = this.state_selected.data.dial_code;
        this.user.country_code=this.state_selected.data.dial_code;
       // this.signup_form.controls.country_code.setValue(this.state_selected.data.dial_code);
    })
    return await alert.present();
}
}