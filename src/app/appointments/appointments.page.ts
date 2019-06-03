import { Component, OnInit } from '@angular/core';
import { Platform,NavController } from '@ionic/angular';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.page.html',
  styleUrls: ['./appointments.page.scss'],
})


export class AppointmentsPage implements OnInit {
	appoinments: any[] = [];
	selected: number = 0;
	first: boolean = true
	constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService) {
		this.appoinments = [];
	}

	ionViewDidEnter() {
		this.selected = 0;
		if (this.first) {
			this.loadingService.present()
		}

		console.log(this.dataService.userData);
		var datavalue = {
			user_id: this.dataService.userData.id
		}
		this.apiService.appointment_list(datavalue).subscribe(data => {
			if (data.status_code == 200) {
				if (this.first) {
					this.loadingService.dismiss()
				}
				this.first=false

				this.appoinments = data.result;
				console.log('APPOINTMENTS ARE', this.appoinments);
			} else if(data.status_code == 401){
				localStorage.clear()
				this.dataService.userData='';
				this.dataService.pageType='';
				this.dataService.tabPage='';
				this.loadingService.dismiss();
				this.navController.navigateRoot('login');
				this.alertService.presentAlert('Alert', 'Your Account has been Deleted due to some reason. Please contact concern company!');
			  }else {
				if (this.first) {
					this.loadingService.dismiss()
					this.alertService.presentAlert('Alert', data.result);
				}
				this.first=false
				this.appoinments=[]

			}
		}, err => {
			if (this.first) {
				this.loadingService.dismiss()
			}
			this.first=false
			//this.alertService.presentAlert('Alert', err)
		})
	}
	ngOnInit() {
		console.log("ngOnInit");
		console.log('tabs appointments ', this.dataService.tabPage);
		// setTimeout(() => {
		// 	if (this.dataService.tabPage == "appointments") {
		// 		this.ionViewDidEnter();
		// 	}
		// 	this.ngOnInit();
		// }, 20000)
		setTimeout(() => {
			if (this.dataService.reschedule) {
				this.ionViewDidEnter();
				this.dataService.reschedule=false
			}
			this.ngOnInit();
		}, 5000)
		
	}

	// notification() {
	// 	this.navController.navigateForward('notification');
	// }
	info() {
		this.navController.navigateForward('help');
	}
	request(value, id,date) {

		///////1 for reschedule//////////
		////////2 for convert ///////////////
		/////////3 for cancel/////////////
		this.dataService.appointment_id = id;
		this.dataService.appointment_type = value;
		if (value == 1) {
			console.log("date",date);
			this.navController.navigateForward('reschedule');
			this.dataService.appointment_date=date;
		} 
		else {
			var dataValue={
                user_id: this.dataService.userData.id,
				appointment_id: this.dataService.appointment_id,
				type: this.dataService.appointment_type,
			}
				this.loadingService.present()
					this.apiService.appointment_reschedule_request(dataValue).subscribe(data => {
						this.loadingService.dismiss()
						if (data.status_code == 200) {
							if (value==2) {
								this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
							}
							else if(value==3){
								this.alertService.presentAlert('Alert',data.result);
							}
							
							//this.navController.navigateRoot('/tabs/appointments');
							this.ionViewDidEnter();
						} else {
							this.alertService.presentAlert('Alert', data.result);
						}
					}, err => {
						this.loadingService.dismiss()
						this.alertService.presentAlert('Alert', err)
					})
		}
		// else {

		// 	this.navController.navigateForward('reschedule');
		// }
		this.selected = 0

		// if(value == 2)
		// this.cancelRequest(value,id);
	}


	// cancelRequest(status, appt_id){
	// 	var datavalue = {
	// 		user_id: this.dataService.userData.id
	// 	}
	// 	this.apiService.appointment_list(datavalue).subscribe(data => {
	// 		if (data.status_code == 200) {
			
	// 		} else {
				
	// 		}
	// 	}, err => {
	// 		if (this.first) {
	// 			this.loadingService.dismiss()
	// 		}
			
	// 	})
	// }
	onClose(){
		this.selected = 0
	}

	
}

