import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular'


@Component({
  selector: 'app-select-water',
  templateUrl: './select-water.component.html',
  styleUrls: ['./select-water.component.scss']
})
export class SelectWaterComponent implements OnInit {
glasses:number=1;
	page:number=1;
	slots
	time
  constructor(public viewController:PopoverController, public navParams: NavParams) { }

  ngOnInit() {
  }
  cancel(){
  	this.viewController.dismiss(null);
  }
  check(){
  	console.log(this.glasses);
  	this.viewController.dismiss(this.glasses);
  	// if(this.weight!=null&&this.weight!=''&&this.weight!=undefined){
  	// 	if(this.weightSelecter)this.viewController.dismiss(this.weight);
  	// 	if(!this.weightSelecter)this.viewController.dismiss(Math.round(this.weight/2.205*100)/100);
  	// }
  }
}
