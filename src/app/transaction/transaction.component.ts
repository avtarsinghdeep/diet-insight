import { Component, OnInit } from '@angular/core';
import { PopoverController, NavController   } from '@ionic/angular';


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  constructor(public popoverCtrl:PopoverController, public navCtrl: NavController) { }

  ngOnInit() {
  }

  onSubmit(){
    var a={
      status:true
    }
    this.popoverCtrl.dismiss(a);
  }
}
