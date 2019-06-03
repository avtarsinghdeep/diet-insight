import { Component, OnInit,ViewChild,ElementRef,HostListener} from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService } from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { NavController,Platform} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-signup-otp',
  templateUrl: './signup-otp.page.html',
  styleUrls: ['./signup-otp.page.scss'],
})
export class SignupOtpPage implements OnInit {
@ViewChild('otp1') otp1;
@ViewChild('otp2') otp2;
@ViewChild('otp3') otp3;
@ViewChild('otp4') otp4;
@ViewChild('otp5') otp5;
@ViewChild('otp6') otp6;
@HostListener('document:keyup', ['$event'])
   handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if(event.key === 'Backspace')
    {
		if(document.activeElement.id=='otp1'){}
		else if(document.activeElement.id=='otp2'){this.otp1.nativeElement.focus();}
		else if(document.activeElement.id=='otp3'){this.otp2.nativeElement.focus();}
		else if(document.activeElement.id=='otp4'){this.otp3.nativeElement.focus();}
		else if(document.activeElement.id=='otp5'){this.otp4.nativeElement.focus();}
		else if(document.activeElement.id=='otp6'){this.otp5.nativeElement.focus();}
    }else if(event.key)
    {
    	if(document.activeElement.id=='otp1'){this.otp2.nativeElement.focus();}
    	else if(document.activeElement.id=='otp2'){this.otp3.nativeElement.focus();}
    	else if(document.activeElement.id=='otp3'){this.otp4.nativeElement.focus();}
    	else if(document.activeElement.id=='otp4'){this.otp5.nativeElement.focus();}
    	else if(document.activeElement.id=='otp5'){this.otp6.nativeElement.focus();}
    	else if(document.activeElement.id=='otp6'){this.otp6.nativeElement.blur();this.updateotp()}
    }
  }
  forgot_form:FormGroup;
  submit:boolean=true;
  otp:string='';
  email;
  constructor(
    public platform:Platform,
    public activatedRoute:ActivatedRoute,
    public navCtrl:NavController,
    public formBuilder: FormBuilder,
    public loadingService:LoadingService,
    public apiService:ApiService,
    public alertService:AlertService,public dataService:DataService) {
  	let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  	this.forgot_form = formBuilder.group({
		password:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(6), Validators.required])],
        confirmPassword:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(6), Validators.required])]
	});
	this.activatedRoute.queryParams.subscribe(params => {
		this.email=params.email
	})
}
  ngOnInit(){}

  setFocus(index){
    console.log('index value is', index);
    switch(index){
    case 0:
    this.otp1.setFocus();
    break;
    case 1:
    this.otp2.setFocus();
    break;
    case 2:
    this.otp3.setFocus();
    break;
    case 3:
    this.otp4.setFocus();
    break;
    case 4:
    this.otp5.setFocus();
    break;
    case 5:
    this.otp6.setFocus();
    break;
    }
  }
    
 updateList(event, maxlength) {
  console.log('KEY PRESSED',event.key);
  if(event.key === 'Backspace'){
   if(maxlength=='1'){}
   else if(maxlength=='2'){this.otp1.setFocus();}
   else if(maxlength=='3'){this.otp2.setFocus();}
   else if(maxlength=='4'){this.otp3.setFocus();}
   else if(maxlength=='5'){this.otp4.setFocus();}
   else if(maxlength=='6'){this.otp5.setFocus();}
  }
  else{
    this.setFocus(maxlength);
  }
 }

signup(){this.navCtrl.navigateForward('signup');}
  updateotp(){
  	this.otp=this.otp1.value+
		   this.otp2.value+
		   this.otp3.value+
		   this.otp4.value+
		   this.otp5.value+
		   this.otp6.value;
  }
  onSend(){
  	this.updateotp()
  	this.submit=false;
  	console.log(this.dataService.signupDATA);
  	console.log(this.dataService.otpValue);
  	console.log("length",this.otp);
   if (this.otp.length>=5) {
	  	if(this.otp==this.dataService.otpValue){
      this.loadingService.present();
      this.apiService.register(this.dataService.signupDATA).subscribe(data => {
        if (data.status_code == 200) {
          this.loadingService.dismiss();
          this.navCtrl.navigateRoot('services');
          this.dataService.userData = data.result;
          localStorage['userDetail'] = JSON.stringify(data.result);
          localStorage['isLoggedIn'] = true;
          this.alertService.presentAlert('Alert', 'Signup Successful..')
        } else {
          this.loadingService.dismiss();
          this.alertService.presentAlert('Alert', data.result);
        }
      }, err => {
        this.loadingService.dismiss();
        this.alertService.presentAlert('Alert', 'Something went wrong...')
      })
  }
  	else{
      this.alertService.presentAlert('Alert',"OTP doesn't match")
    }
}
else{

}
}

onSendOtp(){
  this.loadingService.present();
  this.apiService.sendRegisterOtp({mobile:this.dataService.signupDATA.mobile,type:'signup', email: this.dataService.signupDATA.email}).subscribe(data => {
    if (data.status_code == 200) {
       this.dataService.otpValue=data.result.otp;
      this.loadingService.dismiss();
      //  this.navCtrl.navigateRoot('signup-otp');
      this.alertService.presentAlert('Alert', 'Verification code is sent to your mobile number.')
    } else {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', data.result);
    }
  }, err => {
    this.loadingService.dismiss();
    this.alertService.presentAlert('Alert', 'Something went wrong...')
  })
}

}
