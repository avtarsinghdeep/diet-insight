import { Component, OnInit,ViewChild } from '@angular/core';
import { NavParams,PopoverController, } from '@ionic/angular'
import {LoadingService} from '../shared/index';
@Component({
  selector: 'app-select-state',
  templateUrl: './select-state.component.html',
  styleUrls: ['./select-state.component.scss']
})
  

export class SelectStateComponent implements OnInit {
  state
  @ViewChild('fileInput') fileInput;
  myInput
  states
  main_data
  state_id
  constructor(public loadingService:LoadingService,public viewController:PopoverController, public navParams: NavParams) {
   //  console.log(this.navParams.get('states'));
  	// this.main_data=this.navParams.get('states')
  	// this.states=this.navParams.get('states')
   //   setInterval(()=>{
   //    var a = localStorage['popoverStatus']
   //    if(a==0||a=='0'){
   //        localStorage['popoverStatus']=1;
   //        this.viewController.dismiss();
   //    }
   //  },2000);
    this.loadingService.present();
   }

   ionViewDidEnter(){

        console.log(this.navParams.get('states'));
          this.main_data=this.navParams.get('states')
          this.states=this.navParams.get('states')
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
  		this.states=this.main_data;
  	}else{
  		if (this.myInput && this.myInput.trim() != '') {
	      this.states = this.main_data.filter((item) => {
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
  cancel(){
  	console.log(this.state)
  	this.viewController.dismiss();
  }
  check(){
  	if(this.state!=null&&this.state!=''){
      var data={
        status:true,
        data:this.state.toLowerCase(),
        state_id:this.state_id
      }
	  	this.viewController.dismiss(data);
  	}else{
  		this.viewController.dismiss();		
  	}
  }

  ngOnInit() {
  }
  stateChange(val){
  this.state=val.name;
  this.state_id=val.state_id;
  }

}
