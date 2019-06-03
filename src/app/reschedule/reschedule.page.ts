import { Component, OnInit, ViewChild } from '@angular/core';
// import {CalendarPageModule} from '../calendar/calendar.module'
import { Platform,NavController } from '@ionic/angular';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'

import { CalendarPage } from "../calendar/calendar.page";
import * as moment from 'moment';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.page.html',
  styleUrls: ['./reschedule.page.scss'],
})




export class ReschedulePage implements OnInit {
	am_pm = 'AM';
	hours = '00';
	minutes = '00';
	date;
	today;
	@ViewChild(CalendarPage) calendar;
	constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService) {}

	ngOnInit() {
		console.log(this.dataService.appointment_type);
	}
	receiveDate(event) {
		this.date = event;
		console.log('receive date event', this.date);
	}
	hours_up() {
		if (this.am_pm=="AM") {
			if (parseInt(this.hours) < 11) {
			this.hours = (parseInt(this.hours) + 1).toString().length == 1 ? '0' + (parseInt(this.hours) + 1).toString() : (parseInt(this.hours) + 1).toString();
		} else {
			this.hours = '07';
		}
		}
		else{
			if (parseInt(this.hours) < 10) {
			this.hours = (parseInt(this.hours) + 1).toString().length == 1 ? '0' + (parseInt(this.hours) + 1).toString() : (parseInt(this.hours) + 1).toString();
		} else {
			this.hours = '00';
		}
		}
		
	}
	hours_down() {
		if (this.am_pm=="AM") {
				if (parseInt(this.hours) > 6) {
			this.hours = (parseInt(this.hours) - 1).toString().length == 1 ? '0' + (parseInt(this.hours) - 1).toString() : (parseInt(this.hours) - 1).toString();
		} else {
			this.hours = '11';
		}
		}
		else{
				if (parseInt(this.hours) > 0) {
			this.hours = (parseInt(this.hours) - 1).toString().length == 1 ? '0' + (parseInt(this.hours) - 1).toString() : (parseInt(this.hours) - 1).toString();
		} else {
			this.hours = '10';
		}	
		}
	
	}
	minutes_up() {
		if (this.am_pm=="AM") {
			if (parseInt(this.minutes) < 59) {
			this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
		} else {
			this.minutes = '00';
		}
		}
			else{
              if (this.hours=='10') {
              		if (parseInt(this.minutes) < 45) {
			this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
		} else {
			this.minutes = '00';
		}
              }
              else{
              	      		if (parseInt(this.minutes) < 59) {
			this.minutes = (parseInt(this.minutes) + 1).toString().length == 1 ? '0' + (parseInt(this.minutes) + 1).toString() : (parseInt(this.minutes) + 1).toString();
		} else {
			this.minutes = '00';
		}
              }
			}
		
	}
	minutes_down() {
		if (this.am_pm=="AM") {
          if (parseInt(this.minutes) > 0) {
			this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
		} else {
			this.minutes = '59';
		}
		}
		else{
			if (this.hours=='10') {
				if (parseInt(this.minutes) > 0) {
					this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
				} else {
					this.minutes = '45';
				}
			}
			else{
					if (parseInt(this.minutes) > 0) {
						this.minutes = (parseInt(this.minutes) - 1).toString().length == 1 ? '0' + (parseInt(this.minutes) - 1).toString() : (parseInt(this.minutes) - 1).toString();
					} else {
						this.minutes = '59';
					}
			}
		}
		
	}
	am_pm_change() {
		this.am_pm == 'AM' ? this.am_pm = 'PM' : this.am_pm = 'AM';
	}
	notification() {
		this.navController.navigateForward('notification');
	}
	info() {
		this.navController.navigateForward('help');
	}
	submit() {
		if (this.date != null && this.date != '' && this.date != undefined) {
			let dataValue = {
				user_id: this.dataService.userData.id,
				appointment_id: this.dataService.appointment_id,
				date: this.date,
				type: this.dataService.appointment_type,
				time: (this.am_pm == 'AM' ? this.hours : 12 + parseInt(this.hours)) + ':' + this.minutes
			}
			console.log('DAATA', dataValue);

			let current_datetime = new Date();
			let formatted_date: any = current_datetime.getFullYear() + "-" + (current_datetime.getMonth() + 1) + "-" + current_datetime.getDate()
			console.log('FORMATTED DATE', formatted_date);


			var c_value = formatted_date.split('-');
			console.log('c_value', c_value[0], c_value[1], c_value[2]);
			var c_year = c_value[0];
			var c_month = c_value[1] < 10 ? +"0" + c_value[1] : c_value[1];
			var c_date = c_value[2] < 10 ? +"0" + c_value[2] : c_value[2];
			console.log("current_date" + c_year + "-" + c_month + "-" + c_date);
			var current_date_format = c_year + "-" + c_month + "-" + c_date;


			var p = dataValue.date.split('-');
			console.log("split", p[0], p[1], p[2]);
			var year = p[0];
			var month = p[1] < 10 ? +"0" + p[1] : p[1];
			var date = p[2] < 10 ? +"0" + p[2] : p[2]
			var choose_format_date = year + "-" + month + "-" + date;
			console.log("new_format_date", choose_format_date + "," + current_date_format);

			this.today = Date.now();
			console.log('TODAYS DATE IS', current_date_format + "," + choose_format_date);
			var d = new Date(); // for now
			var hh=d.getHours()<10?"0"+d.getHours():d.getHours();
			var mm=d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes();
			var currentTime = hh + ":" +mm;
			console.log("currentTime", currentTime);


			if (choose_format_date == current_date_format) {
				console.log('current DATE');
				console.log(dataValue.time+","+currentTime)
				if (dataValue.time >= currentTime) {
					console.log('greater');
					this.loadingService.present()
					this.apiService.appointment_reschedule_request(dataValue).subscribe(data => {
						this.loadingService.dismiss()
						if (data.status_code == 200) {
							this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
							this.navController.navigateRoot('/tabs/appointments');
						} else {
							this.alertService.presentAlert('Alert', data.result);
						}
					}, err => {
						this.loadingService.dismiss()
						this.alertService.presentAlert('Alert', err)
					})
				} else {
					console.log("less");
					this.alertService.presentAlert('Alert', 'Please select valid time !')
				}
			} else if (choose_format_date > current_date_format) {
				console.log('greater DATE');
				this.loadingService.present()
				this.apiService.appointment_reschedule_request(dataValue).subscribe(data => {
					this.loadingService.dismiss()
					if (data.status_code == 200) {
						this.dataService.reschedule=true
						this.alertService.presentAlert('Alert', 'You will be notified when your request will be approved by the Dietition.');
						this.navController.navigateRoot('/tabs/appointments');
					} else {
						this.alertService.presentAlert('Alert', data.result);
					}
				}, err => {
					this.loadingService.dismiss()
					this.alertService.presentAlert('Alert', err)
				})

			} else {
				console.log('please select valid date!!!!');
				console.log('please select valid date!!!!');
				this.alertService.presentAlert('Alert', 'Please select Valid Date !');
			}

		} else {
			this.alertService.presentAlert('Alert', 'Please select date.')
		}

	}
	onPop(){
		//this.navController.pop();
		this.navController.navigateBack('/tabs/appointments');
	}
}


// var p=dataValue.date.split('-');
// 				console.log("split",p[0],p[1],p[2]);
// 				var year=p[0];
// 				var month=p[1]<10?+"0"+p[1]:p[1];
// 				var date=p[2]<10?+"0"+p[2]:p[2]
// 				var new_format_date=year+"-"+month+"-"+date;
// 				console.log("new_format_date",new_format_date);

// 			this.today = Date.now();
// 			console.log('TODAYS DATE IS', new Date().toISOString().slice(0,10)+","+dataValue.date);
// 			if(dataValue.date > new Date().toISOString().slice(0,10)){
// 				console.log('VALID DATE');
// 			}
// 			else{
// 				console.log('please select valid date!!!!');
// 			}

