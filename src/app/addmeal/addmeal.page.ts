import { Component, OnInit } from '@angular/core';
import { SelectMealTypeComponent } from '../select-meal-type/select-meal-type.component';
import { ModalController,PopoverController,NavController   } from '@ionic/angular';
import { SelectMealType1Component } from '../select-meal-type1/select-meal-type1.component';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { SelectWeightComponent } from '../select-weight/select-weight.component'
import { SelectWaterComponent } from '../select-water/select-water.component'
import { SelectWaterTimeSlotComponent } from '../select-water-time-slot/select-water-time-slot.component';
@Component({
  selector: 'app-addmeal',
  templateUrl: './addmeal.page.html',
  styleUrls: ['./addmeal.page.scss'],
})
export class AddmealPage implements OnInit {
selectedTabIndex=this.dataService.mealtypePage
user_daily_meal
day
month
year
current
 initial
 current1:any
average1:any
 average
 water_time_slot:any[];
 water_tab_detail:any={goal: null,history: [],ideal_water: null};
  constructor(public modalController: ModalController,public popoverController: PopoverController,public apiService: ApiService,
 public loadingService: LoadingService,
public dataService: DataService,
public alertService: AlertService,public navController:NavController) { 
 var date=new Date();
 var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
 console.log(date.getDate()+","+months[date.getMonth()]+","+date.getFullYear());
 this.day=date.getDate()
 this.month=months[date.getMonth()];
 this.year=date.getFullYear()
  }

  ngOnInit() {
    this.user_weight_history();
       this.loadingService.present();
    this.apiService.user_daily_meals({ user_id:this.dataService.userData.id}).subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        this.user_daily_meal=data.result;
        console.log(this.user_daily_meal);
      } else {
        //this.alertService.presentAlert('Alert', data.result);
        console.log(data)
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }
  segmentChanged(event,selectedTabIndex){
  
  }

  info(){
    this.navController.navigateForward('help');
  }
  async onAddMeal(){
     const modal = await this.modalController.create({
      component: SelectMealType1Component,
      componentProps: { value: 123 }
    });
     modal.onDidDismiss()
     .then((data:any)=>{
       console.log("data",data);
        if (data.data.status==true) {
          this.ngOnInit();
        }

     })
    return await modal.present();
  }
  // async onAddMeal(ev: any){
   
  //   const popover = await this.popoverController.create({
  //     component: SelectMealType1Component,
  //     event: ev,
  //     translucent: true,
  //     cssClass:'custom-popover'
  //   });
  //  popover.onDidDismiss()
  //     .then((data:any) => {
  //       if (data.data.status==true) {
  //       console.log(data);
  //      this.popover()
  //       }
  //       else{
  //       console.log('false');  
  //       }
       
  //   });
  //   return await popover.present();
  // }
 async popover(){
            const modal = await this.modalController.create({
      component: SelectMealTypeComponent,
      componentProps: { value: 123 },
      cssClass:'custom-popover'
    });
               modal.onDidDismiss()
      .then((data:any) => {
        if (data.data.status==true) {
        console.log(data);
        this.ngOnInit();
        }
        else{
        console.log('false');  
        }
       
    });

    return await modal.present();
  }
  JSONfun(val){
   return JSON.parse(val);
  }

  user_weight_history() {

   this.apiService.user_weight_history({user_id:this.dataService.userData.id}).subscribe(data=>{
     this.current1 = parseFloat(data.result.current).toFixed(3);

// this.current = "125.000";
if(this.current1.split(".")[1] == 0 ){
console.log('0 after decimal');
this.current=parseFloat(data.result.current);
}
else{
console.log('another num after decimal');
this.current=parseFloat(data.result.current).toFixed(3);
}
// console.log('weighthththtthhtht',data.result.current, this.current.split("."), parseFloat(data.result.current).toFixed(3));
this.initial=data.result.initial;
this.average1=parseFloat(data.result.average).toFixed(3);
if(this.average1.split(".")[1] == 0){
this.average=parseFloat(data.result.average);
}
else
{
this.average=parseFloat(data.result.average).toFixed(3);
}
   },err=>{
     this.alertService.presentAlert('Alert', err)
   })
   this.apiService.time_slots().subscribe(data=>{
     if(data.status_code==200){this.water_time_slot=data.result;}
   },err=>{})
   this.apiService.water_intake_history({user_id:this.dataService.userData.id}).subscribe(data=>{
     if(data.status_code==200){
       this.water_tab_detail=data.result
       console.log('water intake', this.water_tab_detail);    
     }
   },err=>{})
 }
 async addWater(){
   let popover = await this.popoverController.create({
     component:SelectWaterComponent,
     cssClass:'custom-popover'
   })
   popover.onDidDismiss().then((data)=>{
     if(data.data!=null){
       console.log(data.data)
       console.log(this.water_time_slot)
       let dataValue={
         glassess:data.data,
         time_slot:this.water_time_slot
       }
       this.waterTimeslot(dataValue);
     }
   })
   return await popover.present();
 }
 async waterTimeslot(datavalue){
   let timepop = await this.popoverController.create({
     component:SelectWaterTimeSlotComponent,
     componentProps:{slot:datavalue.time_slot},
     cssClass:'custom-popover'
   })
   timepop.onDidDismiss().then((data)=>{
     if(data.data!=null){
       console.log(data);
       console.log(datavalue);
       this.loadingService.present();
       this.apiService.add_water_intake({
         user_id:this.dataService.userData.id,
         slot:data.data.slot,
         no_of_glass:datavalue.glassess})
       .subscribe(data=>{
         this.loadingService.dismiss();
         this.alertService.presentAlert('Alert', data.result)
         this.ngOnInit();
       },err=>{
         this.loadingService.dismiss();
         this.alertService.presentAlert('Alert', err)
       })
     }
   })
   return await timepop.present();
 }
 async addWeight(){
   let popover = await this.popoverController.create({
     component:SelectWeightComponent,
     cssClass:'custom-popover1'
   })
   popover.onDidDismiss().then((data)=>{
     if(data.data!=null){
       var dataValue={
         weight:data.data,
         user_id:this.dataService.userData.id
       }
       this.loadingService.present();
       this.apiService.add_user_weight(dataValue).subscribe(data=>{
 this.alertService.presentAlert('Alert', data.result)
         this.loadingService.dismiss();
         this.ngOnInit();
       },err=>{
         this.loadingService.dismiss();
         this.alertService.presentAlert('Alert', err)
       })
     }
   })
   return await popover.present();
 }

 ionViewWillLeave() {
   console.log("leave addmeal");
  this.dataService.dashboard_nav=true;
  console.log("Addval",this.dataService.dashboard_nav)
}
}
