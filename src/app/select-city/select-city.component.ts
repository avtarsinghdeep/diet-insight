import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular'
import {LoadingService} from '../shared/index';
@Component({
  selector: 'app-select-city',
  templateUrl: './select-city.component.html',
  styleUrls: ['./select-city.component.scss']
})
export class SelectCityComponent implements OnInit {
  city
  myInput
  cities
  main_data
   city_id
  constructor(public loadingService:LoadingService,public viewController:PopoverController, public navParams: NavParams) {
   this.loadingService.present();
   }

  ngOnInit() {
  }
  ionViewDidEnter(){
     console.log(this.navParams.get('cities'));
    this.main_data=this.navParams.get('cities')
    this.cities=this.navParams.get('cities')
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
  		this.cities=this.main_data;
  	}else{
  		if (this.myInput && this.myInput.trim() != '') {
	      this.cities = this.main_data.filter((item) => {
	        return (item.name.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1);
	      })
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
   this.city=val.name;
   this.city_id=val.city_id;
  }
  cancel(){
  	console.log(this.city)
  	this.viewController.dismiss();
  }
  check(){
  	console.log(this.city)
  	if(this.city!=null&&this.city!=''){
      var data={
        status:true,
        data:this.city.toLowerCase(),
        city_id:this.city_id,
        city_name:this.city.toLowerCase(),
      }
	  	this.viewController.dismiss(data);
  	}else{
  		this.viewController.dismiss();		
  	}
  }
}
