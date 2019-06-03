import { Component, OnInit } from '@angular/core';
import {ToastController, NavController } from '@ionic/angular';
import { ApiService,LoadingService,AlertService,DataService } from '../shared/index';
@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage implements OnInit {
water_intake:boolean=true
  constructor(public toastController: ToastController,public loadingService: LoadingService,
    public apiService: ApiService,
    public dataService: DataService,
    public alertService: AlertService, public navController: NavController) { 
   console.log(this.dataService.userData);
  if(this.dataService.userData.settings.length>0){
    this.water_intake=this.dataService.userData.settings[0].value;
  }
  }

  ngOnInit() {
  }
  change(val,title){
  	 console.log(this.water_intake);
  	 var data={
  	 value:val ? 1 : 0,
     title:title,
  	 user_id:this.dataService.userData.id
  	 }
  	  this.loadingService.present();
      this.apiService.notification_settings(data).subscribe(data => {
        if (data.status_code == 200) {
          this.loadingService.dismiss();
            this.presentToast(data.result);
        } else {
          this.loadingService.dismiss();
          this.presentToast('Something went wrong...')
        }
      }, err => {
        this.loadingService.dismiss();
        this.presentToast('Something went wrong...')
      })
  	 
  }
   async presentToast(val) {
   	 const toast = await this.toastController.create({
      message: val,
      duration: 2000
    });
    toast.present();

  }

  info(){
		this.navController.navigateForward('help');
	  }
     ionViewWillLeave() {
   console.log("leave setting");
  this.dataService.dashboard_nav=true;
  console.log("setting",this.dataService.dashboard_nav)
}

}
