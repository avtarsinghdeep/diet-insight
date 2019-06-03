import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular'
import {LoadingService} from '../shared/index';
@Component({
  selector: 'app-country-code',
  templateUrl: './country-code.component.html',
  styleUrls: ['./country-code.component.scss']
})
export class CountryCodeComponent implements OnInit {
  countryCode
  myInput
  codes
  main_data
  code
  dial_code
  img
  code_image
  constructor(public loadingService:LoadingService,public viewController:PopoverController, public navParams: NavParams) { 
     this.loadingService.present();
  }

  ngOnInit() {
  }
   ionViewDidEnter(){
     console.log(this.navParams.get('codes'));
    this.main_data=this.navParams.get('codes')
    this.countryCode=this.navParams.get('codes')
     setInterval(()=>{
      var a = localStorage['popoverStatus']
      if(a==0||a=='0'){
          localStorage['popoverStatus']=1;
          this.viewController.dismiss();
      }
    },2000);
      this.loadingService.dismiss();
   }


  onInput(value){
  	// console.log(value)
  	if(this.myInput==null||this.myInput==''){
  		this.countryCode=this.main_data;
  	}else{
  		if (this.myInput && this.myInput.trim() != '') {
	      this.countryCode = this.main_data.filter((item) => {
	        return (item.name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1);
	      })
    	}
      else{
        this.countryCode=this.main_data;
      }
  	}
  }
  onCancel(value){
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCountryPage');
  }
  selectcity(val){
   console.log(val);
   this.code=val.name;
   this.dial_code=val.dial_code;
   this.code_image= val.img;
  }
  cancel(){
  	console.log(this.code)
  	this.viewController.dismiss();
  }


  check(){
  	console.log(this.code)
  	if(this.code!=null&&this.code!=''){
      var data={
        status:true,
        data:this.code.toLowerCase(),
        dial_code:this.dial_code,
        country_name:this.code.toLowerCase(),
        code_image:this.code_image
      }
	  	this.viewController.dismiss(data);
  	}else{
  		this.viewController.dismiss();		
  	}
  }
}
