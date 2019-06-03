import { Component, OnInit } from '@angular/core';
import { NavController,ModalController } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { AdminchatComponent } from '../adminchat/adminchat.component';
@Component({
  selector: 'app-services',
  templateUrl: './services.page.html',
  styleUrls: ['./services.page.scss'],
})
export class ServicesPage implements OnInit {
    services=[];
  constructor(public apiService:ApiService,
            public loadingService:LoadingService,
            public dataService:DataService,
            public navController:NavController,
            public alertService:AlertService,private callNumber: CallNumber,public modalController: ModalController){
     this.dataService.tabPage="services";
     console.log("upgrade_status",this.dataService.upgrade_status);
             }
  ngOnInit(){
      this.loadingService.present()
      this.apiService.services_list().subscribe(data=>{
          if(data.status_code==200){
              this.loadingService.dismiss()
              this.services=data.result;
          }else{
              this.loadingService.dismiss()
              this.alertService.presentAlert('Alert',data.result);    
          }
      },err=>{
          this.loadingService.dismiss()
          this.alertService.presentAlert('Alert','Something went wrong...')
      })
  }
  openDetail(service){
      this.dataService.data=service;
      this.navController.navigateForward('service-detail');
      console.log(this.dataService.data);
  }
  onCall(){
    this.callNumber.callNumber("+919870481482", true)
    .then(res => console.log('Launched dialer!', res))
    .catch(err => console.log('Error launching dialer', err));
  }
  async onChat(ev: any) {
    
    const modal = await this.modalController.create({
      component: AdminchatComponent,
      componentProps: { value: 123 }
    });
    return await modal.present();
  }
  info(){
    this.navController.navigateForward('help');
  }
}