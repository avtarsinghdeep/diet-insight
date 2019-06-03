import { Component, OnInit } from '@angular/core';
import {NavParams,PopoverController} from '@ionic/angular';
@Component({
  selector: 'app-message-image-pop',
  templateUrl: './message-image-pop.component.html',
  styleUrls: ['./message-image-pop.component.scss']
})
export class MessageImagePopComponent implements OnInit {
  img
  constructor(public navparams:NavParams,public popoverCtrl:PopoverController) { 
   this.img=this.navparams.get('event');
  }

  ngOnInit() {
  }

  dismiss(){
   this.popoverCtrl.dismiss();
  }

}
