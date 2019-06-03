import { Component, OnInit,ViewChild,ElementRef } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-medical-profile1',
  templateUrl: './medical-profile1.page.html',
  styleUrls: ['./medical-profile1.page.scss'],
})
export class MedicalProfile1Page implements OnInit {
	cm;
	feet;
	inch;
	weightSelecter:boolean=true;
	heightSelecter:boolean=true;
	medical_profile
	medical_problems_list:any[];
  constructor(public apiService:ApiService,
			public loadingService:LoadingService,
			public dataService:DataService,
			public formBuilder:FormBuilder,
			public navController:NavController,
			public alertService:AlertService) {
  	this.medical_profile = formBuilder.group({
        height:['',Validators.compose([Validators.required])],
        weight:['',Validators.compose([Validators.required])],
        blood_group:['',Validators.compose([Validators.required])],
        medical_problem:['',Validators.compose([Validators.required])],
    });
  }
  chageHeight(heightSelecter){
  	this.medical_profile.controls.height.touched=true;
  	if(heightSelecter){
  		console.log(this.cm);
  		this.medical_profile.controls.height.setValue(this.cm);
  	}else if(this.feet>=0&&this.inch>=0){
  		this.medical_profile.controls.height.setValue(Math.round((this.feet*30.48)+(this.inch*2.54)));
  		console.log(this.medical_profile.value.height);
  	}
  }
  ngOnInit() {
  	this.apiService.medical_problems_list().subscribe(data=>{
  		if(data.status_code=200){
  			this.medical_problems_list=data.result;
  		}else{
  			this.medical_problems_list=[{id: 0, problem_name: "Data not Found"}]
  		}
  	},err=>{
  		console.log(err)
  	})
  }
  submit(){
  	if(this.medical_profile.valid){
		this.loadingService.present();
	  	let data={user_id:this.dataService.userData.id,...this.medical_profile.value}
	  	this.apiService.medical_profile(data).subscribe(data=>{
			this.loadingService.dismiss();
	  		if(data.status_code==200){
	  			localStorage['userDetail']=JSON.stringify(data.result);
	  			this.navController.navigateForward('medical-profile2')
	  		}else{
	  			this.alertService.presentAlert('Alert',data.result);
	  		}
	  	},err=>{
			this.loadingService.dismiss();
	  		this.alertService.presentAlert('Alert','Something went wrong...')
	  		console.log(err);
	  	})
  	}else{
  		this.alertService.presentAlert('Alert','Please fill all fields.')
  	}
  }
  skip(){
  	this.navController.navigateForward('medical-profile2')
  }
}
