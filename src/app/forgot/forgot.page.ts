import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService } from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { NavController,Platform,NavParams } from '@ionic/angular';
import { NavigationExtras,Router } from '@angular/router';
import {country_code} from '../country_code'
@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.page.html',
  styleUrls: ['./forgot.page.scss'],
})
export class ForgotPage implements OnInit {
	forgot_form:FormGroup;
  c_code=[];
  user
  customOptions: any = {header: 'Country code'};
  flag:any;
  constructor(
    public platform:Platform,
    public router:Router,
    public navCtrl:NavController,
    public formBuilder: FormBuilder,
    public loadingService:LoadingService,
    public apiService:ApiService,
    public alertService:AlertService) {
    let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    this.forgot_form = formBuilder.group({
      email:['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
      country_code:['',Validators.compose([Validators.required])],
      phoneNo:['',Validators.compose([Validators.required,Validators.maxLength(25),Validators.minLength(3)])],
    });
    this.forgot_form.controls.country_code.setValue('+91');
  }
  ionViewDidLoad(){
  }
  checkFlag(){
    console.log(this.forgot_form.value.country_code);
    this.flag=this.c_code.filter((a)=>{return this.forgot_form.value.country_code==a.dial_code})[0].img;
  }
  sort(){
    return this.c_code.sort((a:any,b:any)=>{return a.dial_code - b.dial_code})
  }
  ngOnInit() {
    setTimeout(()=>{
      this.c_code=country_code;
      this.checkFlag()
    },1000)
  }
  signup(){this.navCtrl.navigateForward('signup');}
  forgot(){
  	if(this.forgot_form.controls.email.valid||this.forgot_form.controls.phoneNo.valid){
	    var data=this.forgot_form.value;
	    this.loadingService.present()
	    this.apiService.forget_password(data).subscribe(data=>{
	    	this.loadingService.dismiss()
	    	if(data.status_code==200){
		    	let navigationExtras: NavigationExtras = {
		            queryParams: {
		                email:this.forgot_form.value.email,
		                otp:data.result.otp,
                    phoneNo:this.forgot_form.value.phoneNo
		            }
		        };
		        console.log(navigationExtras);
		        this.router.navigate(['forgot-otp'],navigationExtras)
	      		// this.navCtrl.navigateForward('forgot-otp',navigationExtras);
	    	}else{
      		this.alertService.presentAlert('Alert',data.result);
        }
      },err=>{
        this.loadingService.dismiss()
          this.alertService.presentAlert('Alert','Please enter valid credentials')
	    })
	  }else{
      this.alertService.presentAlert('Alert','Please enter new password!')
    }
  }
}
