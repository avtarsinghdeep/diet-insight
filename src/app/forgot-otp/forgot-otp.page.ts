import { Component, OnInit,ViewChild,ElementRef,HostListener} from '@angular/core';
import { ApiService,LoadingService,AlertService } from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';
import { NavController,Platform} from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-forgot-otp',
  templateUrl: './forgot-otp.page.html',
  styleUrls: ['./forgot-otp.page.scss'],
})
export class ForgotOtpPage implements OnInit {
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
  phoneNo
  constructor(
    public platform:Platform,
    public activatedRoute:ActivatedRoute,
    public navCtrl:NavController,
    public formBuilder: FormBuilder,
    public loadingService:LoadingService,
    public apiService:ApiService,
    public alertService:AlertService) {
  	let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  	this.forgot_form = formBuilder.group({
		password:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(8), Validators.required])],
        confirmPassword:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(8), Validators.required])]
	});
	this.activatedRoute.queryParams.subscribe(params => {
		this.email=params.email;
    this.phoneNo=params.phoneNo
	})
	// this.email=this.navParams.get('email');
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
  forgot(){
  	this.updateotp()
  	this.submit=false;
  	if(this.forgot_form.value.confirmPassword!=this.forgot_form.value.password){
      this.alertService.presentAlert('Alert',"Password doesn't match")
  	}else if(this.forgot_form.valid && this.otp.length==6){
		var data={
			email:this.email?this.email:this.phoneNo,
			otp:this.otp,
			password:this.forgot_form.value.password
		}
		this.loadingService.present()
		this.apiService.change_password(data).subscribe(data=>{
			this.loadingService.dismiss()
			if(data.status_code=='200'){
      			this.alertService.presentAlert('Alert','Password reset successful');
      			this.navCtrl.navigateRoot('login');
			}else{
      			this.alertService.presentAlert('Alert',data.result);
			}
		},err=>{
      		this.alertService.presentAlert('Alert','Something went wrong...')
			this.loadingService.dismiss()
		})
	}else{
      this.alertService.presentAlert('Alert','Please enter valid credentials')
    }
  }
}