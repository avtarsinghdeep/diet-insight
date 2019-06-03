import { Component, OnInit } from '@angular/core';
import { ModalController ,MenuController,NavController} from '@ionic/angular'
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AdminchatComponent } from '../adminchat/adminchat.component';
import {
    DataService
} from '../shared/index'
import { EmailComposer } from '@ionic-native/email-composer/ngx';
@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {

  constructor(private emailComposer: EmailComposer,private callNumber: CallNumber,public dataService:DataService, public modalController:ModalController,private menuController:MenuController,public navCtrl:NavController) { 
     if (this.dataService.pageType=="sidemenu") {
          this.menuController.enable(true,'first')
        }
        else{
          this.menuController.enable(false,'first')
        }
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
   async onChat() {
    const modal = await this.modalController.create({
      component: AdminchatComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  onPop(){
    this.navCtrl.pop();
  }

}
