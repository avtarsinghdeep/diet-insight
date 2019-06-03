import { Component, OnInit } from '@angular/core';
import { PopoverController,ModalController   } from '@ionic/angular';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-select-meal-type1',
  templateUrl: './select-meal-type1.component.html',
  styleUrls: ['./select-meal-type1.component.scss']
})
export class SelectMealType1Component implements OnInit {
meal_time
meal_name
myDate
h:any
  constructor(public popoverCtrl:PopoverController,public dataService:DataService,public apiService: ApiService,public loadingService:LoadingService,public alertService:AlertService,public modalCtrl:ModalController) { }

  ngOnInit() {
  }
   converTime (time) {
  let hour = (time.split(':'))[0]
  let min = (time.split(':'))[1]
  let part = hour > 12 ? 'pm' : 'am';
  
  min = (min+'').length == 1 ? `0${min}` : min;
  hour = hour > 12 ? hour - 12 : hour;
  hour = (hour+'').length == 1 ? `0${hour}` : hour;

  return (`${hour}:${min} ${part}`)
}


  change(date){
  	console.log('click..',date);
  	
function timeTo12HrFormat(time)
{   // Take a time in 24 hour format and format it in 12 hour format
    var time_part_array = time.split(":");
    var ampm = 'AM';

    if (time_part_array[0] >= 12) {
        ampm = 'PM';
    }

    if (time_part_array[0] > 12) {
        time_part_array[0] = time_part_array[0] - 12;
    }

    var formatted_time = time_part_array[0] + ':' + time_part_array[1] + ':' + time_part_array[2] + ' ' + ampm;

    return formatted_time;
}



var time = timeTo12HrFormat(date);
this.meal_time=time
console.log(time);  // 6:00:00 PM
}
onSubmit(val){
console.log(this.meal_time);

if (val==1) {
     var a={
      user_id:this.dataService.userData.id,
      meal_value:this.meal_name,
      meal_time:this.meal_time
    }
    console.log(a);
      this.loadingService.present();
    this.apiService.add_user_meal(a).subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        var b={
          status:true
        }
        this.modalCtrl.dismiss(b);
      } else {
        this.alertService.presentAlert('Alert', data.result);
        console.log(data)
        var b={
          status:false
        }
        this.modalCtrl.dismiss(b);
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
       var b={
          status:false
        }
        this.modalCtrl.dismiss(b);
    })
}
else{
	  var data1={status:false}
   this.modalCtrl.dismiss(data1)	
}
}

}
