import { Component, OnInit } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { Validators, FormBuilder,FormGroup} from '@angular/forms';

@Component({
  selector: 'app-medical-profile3',
  templateUrl: './medical-profile3.page.html',
  styleUrls: ['./medical-profile3.page.scss'],
})
export class MedicalProfile3Page implements OnInit {
	medical_profile
  constructor(public apiService:ApiService,
			public loadingService:LoadingService,
			public dataService:DataService,
			public formBuilder:FormBuilder,
			public navController:NavController,
			public alertService:AlertService) {
  	this.medical_profile = formBuilder.group({
        smoking_relation:['',Validators.compose([Validators.required])],
        alcohol_relation:['',Validators.compose([Validators.required])],
        tobaco_relation:['',Validators.compose([Validators.required])],
        aerated_drink_relation:['',Validators.compose([Validators.required])],
        nature_of_work:['',Validators.compose([Validators.required])],
        stress_level:['',Validators.compose([Validators.required])],
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
	  			this.navController.navigateRoot('tabs/home')
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
  	this.navController.navigateRoot('tabs/home')
  }
}
