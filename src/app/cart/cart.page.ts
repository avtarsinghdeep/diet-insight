import { Component, OnInit } from '@angular/core';
import { NavController,MenuController } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import * as moment from 'moment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
})
export class CartPage implements OnInit {
  date=moment().format('DD/MM/YYYY');
  constructor(public dataService:DataService,public navController:NavController,private menuController:MenuController) {
   if (this.dataService.pageType=="sidemenu") {
          this.menuController.enable(true,'first')
        }
        else{
          this.menuController.enable(false,'first')
        }
   }

  ngOnInit() {
  	console.log(this.dataService.data);
  }
  submit(){
  	this.navController.navigateForward('payment');
  }
  info(){
    this.navController.navigateForward('help');
  }

}
