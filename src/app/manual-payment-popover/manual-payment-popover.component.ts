import { Component, OnInit } from '@angular/core';
import {PopoverController} from '@ionic/angular'
@Component({
  selector: 'app-manual-payment-popover',
  templateUrl: './manual-payment-popover.component.html',
  styleUrls: ['./manual-payment-popover.component.scss']
})
export class ManualPaymentPopoverComponent implements OnInit {

  constructor(public popoverCtrl:PopoverController) { }

  ngOnInit() {
  }
  onSubmit(){
   this.popoverCtrl.dismiss();
  }

}
