import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { ModalController   } from '@ionic/angular';
@Component({
  selector: 'app-select-meal-type',
  templateUrl: './select-meal-type.component.html',
  styleUrls: ['./select-meal-type.component.scss']
})
export class SelectMealTypeComponent implements OnInit {
data
meal_value
maindata=[]
mealQuantity:boolean=false
  constructor(public apiService: ApiService,
 public loadingService: LoadingService,
public dataService: DataService,
public alertService: AlertService,public modalCtrl:ModalController) {
console.log("mealpage",this.dataService.meal_time,this.dataService.meal_name)
 }

  ngOnInit() {
     this.loadingService.present();
    this.apiService.fooditems().subscribe(data => {
      this.loadingService.dismiss();
      if (data.status_code == 200) {
        var array=[]
        for(var i=0;i<data.result.length;i++){
          var obj=data.result[i];
          obj.selected=false;
          obj.food_qty=1;
          array.push(obj);
        }
       this.data=array;
       this.maindata=array;
       console.log(array);
      } else {
        this.alertService.presentAlert('Alert', data.result);
        console.log(data)
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }
   onInput(ev :any){
    let val = ev.target.value;
    this.data=this.maindata;
    if (val && val.trim() != '') {
      this.data = this.data.filter((item) => {
        return (item.food_item.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    }
    else{
    this.data=this.maindata;
    }
  }
   selectItem(item){
    console.log(item);
    for(let i=0;i<this.data.length;i++){
      if(this.data[i].id==item.id){
        this.data[i].selected=item.selected;
      }
    }
  }
   add(i){
    this.meal_value[i].food_qty++
  }
  remove(i){
    this.meal_value[i].food_qty>1?this.meal_value[i].food_qty--:'';
  }
  add_user_meal(){
  	console.log("addusermeal");
    var array=[]
    for(var i=0;i<this.data.length;i++){
      if (this.data[i].selected==true) {
         array.push(this.data[i])
      }
    }
    console.log(array,array.length);
     if (array.length>=1) {
               var a={
      user_id:this.dataService.userData.id,
      meal_value:array,
      meal_name:this.dataService.meal_name,
      meal_time:this.dataService.meal_time
    }
       this.dataService.mealType=a;
       this.meal_value=array
       this.mealQuantity=true
 
     }
     else{
        this.alertService.presentAlert('Alert', 'Plase select food item')
     }
  }
  savemeal(){
    console.log("savemeal");
     var a={
      user_id:this.dataService.userData.id,
      meal_value:this.meal_value,
      meal_name:this.dataService.meal_name,
      meal_time:this.dataService.meal_time
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
      }
    }, err => {
      this.loadingService.dismiss();
      this.alertService.presentAlert('Alert', 'Something went wrong...')
      console.log(err)
    })
  }
  onDismiss(val){
    var b={
          status:false
        }
   this.modalCtrl.dismiss(b);
  }

}
