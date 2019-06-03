import { Component, OnInit } from '@angular/core';
import {NavController} from '@ionic/angular';
import { Validators, FormBuilder} from '@angular/forms';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { DataService} from '../shared/index'
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.page.html',
  styleUrls: ['./contactus.page.scss'],
})
export class ContactusPage implements OnInit {

  constructor(public dataService:DataService,public formBuilder:FormBuilder,private emailComposer: EmailComposer,private callNumber: CallNumber,public navController:NavController) { 
 
}

  ngOnInit() {
  }
    onCall(val){
    this.callNumber.callNumber(val, true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  onSendEmail(val){
    console.log(val);
 	let email = {
  to: val,
}
this.emailComposer.open(email);

  }
  info(){
    this.navController.navigateForward('help');
  }
  onDisclaimer(){
    this.dataService.tabPage="contactus";
    this.navController.navigateForward('term-conditions');
  }

}
