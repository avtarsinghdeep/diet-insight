import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { NavController,Platform,PopoverController} from '@ionic/angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Device } from '@ionic-native/device/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { CountryCodeComponent } from '../country-code/country-code.component';
import {country_code} from '../country_code';
import {environment} from '../../environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  user;
  pass;
  dial_code
  device_id
  device_token
  Login_with="1"
  login_form: FormGroup;
  login_form1: FormGroup;
  phonenumber: any;
  loading: any;
  flag: any;
  img
  c_code
  state_selected
  zero:boolean=false
  constructor(
    public googlePlus: GooglePlus,
    public platform: Platform,
    public fb: Facebook,
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public loadingService: LoadingService,
    public apiService: ApiService,
    public dataService: DataService,
    public popoverController: PopoverController,
    public alertService: AlertService, private device: Device, private fcm: FCM) {
      this.user={}
    // let emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}|[0-9]{10,12}$/;
    let emailRegex=/^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let phoneValidation=/^[1-9a-zA-Z][0-9a-zA-Z]*$/
    this.login_form = formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],

    });
     this.login_form1 = formBuilder.group({
      password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(6), Validators.required])],
      phoneNo: ['', Validators.compose([Validators.required, Validators.maxLength(15), Validators.minLength(6),Validators.pattern(phoneValidation)])]
    });
    this.dataService.pageType == ''

    this.user.country_code = '+91';
    this.img = environment.apiUrl+'/flags/in.svg';
  }
  signUp() {
    this.navCtrl.navigateForward('signup');
  }
  forgot() {
    this.navCtrl.navigateForward('forgot');
  }
  ngOnInit() {
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
  login() {
    if (this.Login_with=="1") {
       if (this.login_form.valid) {
      console.log('email is', this.login_form.controls.email.valid);
       
          console.log('wrong.....ELSE');
          var data = {
            login_type: 'form', //social
            email: this.login_form.value.email,
            password: this.login_form.value.password,
            device_id: this.device_id,
            device_token: this.device_token
          // }
        }

      this.loadingService.present();
      this.apiService.login(data).subscribe(data => {
        if (data.status_code == 200) {
          localStorage['userDetail'] = JSON.stringify(data.result);
          localStorage['isLoggedIn'] = true;
          console.log('USER DATA', this.dataService.userData);
          this.dataService.userData=data.result;
          console.log('USER DATA=====', data.result);
          localStorage['profile_img']=this.dataService.userData.profile_image;
          localStorage['login_type']='form';
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', 'Login Successful..');
          this.navCtrl.navigateRoot('tabs');
         // this.navCtrl.navigateRoot('personal-profile');
        } else {
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        console.log(err);
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', err);
      })
    } else {
      this.alertService.presentAlert('Alert', 'Please enter valid credentials')
    }
    }
    else if (this.Login_with=="2") {
       if (this.login_form1.valid) {
      console.log('phonenumber is',this.login_form1.controls.phoneNo.valid);
       
          console.log('wrong.....ELSE');
          var data = {
            login_type: 'form', //social
            email: this.login_form1.value.phoneNo,
            password: this.login_form1.value.password,
            device_id: this.device_id,
            device_token: this.device_token
          // }
        }

      this.loadingService.present();
      this.apiService.login(data).subscribe(data => {
        if (data.status_code == 200) {
          localStorage['userDetail'] = JSON.stringify(data.result);
          localStorage['isLoggedIn'] = true;
          this.dataService.userData=data.result;
          localStorage['profile_img']=this.dataService.userData.profile_image;
          localStorage['login_type']='form';
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', 'Login Successful..');
          this.navCtrl.navigateRoot('tabs');
         // this.navCtrl.navigateRoot('personal-profile');
        } else {
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        console.log(err);
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', err);
      })
    } else {
      this.alertService.presentAlert('Alert', 'Please enter valid credentials')
    }
    }
 
  }
  fb_login() {
    let permissions = new Array();
    permissions = ["public_profile", "email"];
    this.fb.login(permissions).then((response) => {
      let userId = response.authResponse.userID;
      let params = new Array();
      this.fb.api("/me?fields=name,gender,email,id,first_name,last_name", params)
        .then((user) => {
          user.picture = "https://graph.facebook.com/" + userId + "/picture?type=large";
          this.facebook(user);
          //console.log('USER Facebook birth date', user.birthday);
        })
    }, (error) => {
      this.alertService.presentAlert('Alert', 'Something went wrong...')
    })
  }

  facebook(user) {
    var data = {
      login_type: 'social', //social
      email: user.email,
      socialID: user.id,
      firstname: user.first_name,
      lastname: user.last_name,
      device_id: this.device_id,
      device_token: this.device_token
    }
    this.loadingService.present();
    this.apiService.login(data).subscribe(data => {
      if (data.status_code == 200) {
        localStorage['userDetail'] = JSON.stringify(data.result);
        localStorage['isLoggedIn'] = true;
        localStorage['login_type']='social';
        localStorage['fb_birthday']= user.birthday;
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Login Successful..');
        this.navCtrl.navigateRoot('tabs');
      } else {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', err);
    })
  }
  gmail_login() {
    this.googlePlus.login({}).then(res => {
      this.googlelogin(res)
    }).catch(err => {
      console.log(err);
      this.alertService.presentAlert('Something went wrong', 'please try again later');
    });
    console.log('gmail');
  }
  googlelogin(user) {
    var name = user.displayName.split(" ");
    var data = {
      login_type: 'social', //social
      email: user.email,
      socialID: user.userId,
      firstname: name[0],
      lastname: name[1],
      device_id: this.device_id,
      device_token: this.device_token
    }
    this.loadingService.present();
    this.apiService.login(data).subscribe(data => {
      if (data.status_code == 200) {
        localStorage['userDetail'] = JSON.stringify(data.result);
        localStorage['isLoggedIn'] = true;
        localStorage['login_type']='social';
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert1', 'Login Successful..');
        this.navCtrl.navigateRoot('tabs');
      } else {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert2', data.result);
      }
    }, err => {
      console.log(err);
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', err);
    })
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



  onInput(event){
    if (event.length>0) {
      console.log("ev",event,event.length);
      console.log(event.charAt(0));
      if (event.charAt(0)==0 || event.charAt(0)=='0') {
         this.zero=true;
      }
      else{
        this.zero=false;
      }
    }
    
  }
}