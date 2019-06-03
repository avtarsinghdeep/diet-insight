import { Component, OnInit } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-medical-profile2',
  templateUrl: './medical-profile2.page.html',
  styleUrls: ['./medical-profile2.page.scss'],
})
export class MedicalProfile2Page implements OnInit {
	medical_profile
  constructor(public apiService:ApiService,
			public loadingService:LoadingService,
			public dataService:DataService,
			public formBuilder:FormBuilder,
			public navController:NavController,
			public alertService:AlertService) {
  	this.medical_profile = formBuilder.group({
        food_preference:['',Validators.compose([Validators.required])],
        food_allergy:['',Validators.compose([Validators.required])],
        times_you_eat:['',Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {
  }
  submit(){
  	if(this.medical_profile.valid){
		this.loadingService.present();
	  	let data={user_id:this.dataService.userData.id,...this.medical_profile.value}
	  	this.apiService.medical_profile(data).subscribe(data=>{
			this.loadingService.dismiss();
	  		if(data.status_code==200){
	  			localStorage['userDetail']=JSON.stringify(data.result);
	  			this.navController.navigateForward('medical-profile3')
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
  	this.navController.navigateForward('medical-profile3')
  }
}
