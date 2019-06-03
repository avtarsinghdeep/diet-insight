import { Component, OnInit } from '@angular/core';
import { NavController,NavParams,PopoverController } from '@ionic/angular'

@Component({
  selector: 'app-select-water-time-slot',
  templateUrl: './select-water-time-slot.component.html',
  styleUrls: ['./select-water-time-slot.component.scss']
})
export class SelectWaterTimeSlotComponent {
selection;
  gender;
  food_meal_type;
      public showLeftButton: boolean;
    public showRightButton: boolean;
  constructor(public navParams:NavParams,public viewCtrl:PopoverController) {
  	this.food_meal_type=this.navParams.get('slot');
    console.log(JSON.stringify(this.food_meal_type),'asd');
  }
  check(){
    this.viewCtrl.dismiss({slot:this.gender})
  }
  cancel(){
    this.viewCtrl.dismiss();  
  }
}
