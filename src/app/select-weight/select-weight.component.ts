import { Component, OnInit } from '@angular/core';
import { NavParams,PopoverController } from '@ionic/angular'

@Component({
  selector: 'app-select-weight',
  templateUrl: './select-weight.component.html',
  styleUrls: ['./select-weight.component.scss']
})
export class SelectWeightComponent implements OnInit {
	weight
	weightSelecter:boolean=true;
  constructor(public viewController:PopoverController, public navParams: NavParams) { }

  ngOnInit() {
  }
  cancel(){
  	this.viewController.dismiss(null);
  }
  check(){
  	if(this.weight!=null&&this.weight!=''&&this.weight!=undefined){
  		if(this.weightSelecter)this.viewController.dismiss(this.weight);
  		if(!this.weightSelecter)this.viewController.dismiss(Math.round(this.weight/2.205*100)/100);
  	}
  }
}
