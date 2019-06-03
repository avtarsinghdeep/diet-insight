import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular'
import {LoadingService,DataService} from '../shared/index';
@Component({
  selector: 'app-select-country',
  templateUrl: './select-country.component.html',
  styleUrls: ['./select-country.component.scss']
})
export class SelectCountryComponent {
country
myInput
countries
main_data
  constructor(public dataService:DataService,public loadingService:LoadingService,public viewController:PopoverController, public navParams: NavParams) {
  	this.loadingService.present();
  }
  ionViewDidEnter(){
    console.log( this.dataService.coutry_data);
    this.main_data= this.dataService.coutry_data
    this.countries= this.dataService.coutry_data
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
  		this.countries=this.main_data;
      console.log("null");
  	}else{
  		if (this.myInput && this.myInput.trim() != '') {
	      this.countries = this.main_data.filter((item) => {
	        return (item.name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1);
	      })
    	}
  	}
  }
  onCancel(value){
    console.log("val",value);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SelectCountryPage');
  }
  cancel(){
  	console.log(this.country)
  	this.viewController.dismiss();
  }
  check(){
  	console.log(this.country)
  	if(this.country!=null&&this.country!=''){
	  	this.viewController.dismiss(this.main_data.filter((item) => {
		    return (item.country_code.toLowerCase().indexOf(this.country.toLowerCase()) > -1);
		}))
  	}else{
  		this.viewController.dismiss();		
  	}
  }
}