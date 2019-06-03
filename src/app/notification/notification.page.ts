import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index';
import { NavController,AlertController } from '@ionic/angular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.page.html',
  styleUrls: ['./notification.page.scss'],
})
export class NotificationPage implements OnInit {
  notifications
  first:boolean=true
  constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
    public alertService: AlertService,public alertCtrl:AlertController) { }
    
    ionViewDidEnter() {
      let data = {
        user_id: this.dataService.userData.id
      }
     
       if (this.first) {
            this.loadingService.present();
         }
        this.apiService.notification_list(data).subscribe(data => {
         if (this.first) {
           this.loadingService.dismiss();
         }
         
          if (data.status_code == 200) {
           
              if (this.first) {
            this.loadingService.dismiss()
         }
            this.notifications = data.result;
            console.log('Notifications are:', this.notifications);
            this.first=false;
  
          } else if(data.status_code == 401){
            localStorage.clear();
            this.dataService.userData='';
            this.dataService.pageType='';
            this.dataService.tabPage='';
            this.loadingService.dismiss();
            this.navController.navigateRoot('login');
            this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
          }else {
             if (this.first) {
           this.alertService.presentAlert('Alert', data.result);
           this.notifications=""
         }
          this.first=false;
           
          }
        }, err => {
         
            if (this.first) {
             this.loadingService.dismiss();
          //this.alertService.presentAlert('Alert', 'Something went wrong...');
         }
          console.log(err);
        })
    }
      async presentAlertConfirm() {
    const alert = await this.alertCtrl.create({
      message: 'Are you sure want to remove all notifications?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            this.trash();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
    trash(){
      console.log('clear notification clicked');
      let data = {
      user_id: this.dataService.userData.id
      }
      this.apiService.notification_clearlist(data).subscribe(data => {
      console.log(this.dataService.userData.id);
      if (data.status_code == 200) {
      // console.log('clear notification data', data);
      this.alertService.presentAlert('Alert', data.result);
      this.notifications=[];
      this.ionViewDidEnter();
      } else {
      console.log(data.status_code);
      }
      }, err => {
      if (this.first) {
      this.loadingService.dismiss();
      //this.alertService.presentAlert('Alert', 'Something went wrong...');
      }
      console.log(err);
      })
}
    ionViewDidLeave() {
    this.first = false
    console.log("notification", this.first)
  }

  ngOnInit() {

  //   setTimeout(() => {
		// 	if (this.dataService.tabPage == "notification") {
		// 		this.ionViewDidEnter();
		// 	}
		// 	this.ngOnInit();
		// }, 10000)
    
  }

  typeClick(type){
    console.log("type is :" + type);
    if(type=='offer'){
     this.navController.navigateForward('servicesSide');
    }
    else if (type=='appointment') {
     this.navController.navigateForward('/tabs/appointments');
    }
    else if (type=='weight') {
          this.dataService.mealtypePage='3'
        this.navController.navigateForward('addmeal');
    }
    else if (type=='meal') {
          this.dataService.mealtypePage='1'
        this.navController.navigateForward('addmeal');
    }
    else if (type=='Dietchart' || type=='DietChart') {
        this.navController.navigateForward('/tabs/mydietplan');
    }
    else if (type=='water_intake') {
     this.dataService.mealtypePage='2'
        this.navController.navigateForward('addmeal');
    }
  }
   info(){
    this.navController.navigateForward('help');
  }

}
