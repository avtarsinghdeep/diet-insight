import { Component, OnInit } from '@angular/core';
import { NavController,IonContent ,PopoverController,ModalController  } from '@ionic/angular'
import { PackageUpgradeComponent } from '../package-upgrade/package-upgrade.component';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index';

import { UpgradePaymentPackageComponent } from '../upgrade-payment-package/upgrade-payment-package.component';
import {
  TransactionComponent
} from '../transaction/transaction.component';
import { ManualPaymentPopoverComponent } from '../manual-payment-popover/manual-payment-popover.component';
@Component({
  selector: 'app-packages',
  templateUrl: './packages.page.html',
  styleUrls: ['./packages.page.scss'],
})
export class PackagesPage implements OnInit {
  value:boolean
upgrade_package=[{
	package:'1 month,($1500)($300)',
	status:true
},
{
	package:'3 month,($2500)($700)',
	status:false
},
{
	package:'6 month,($5000)($1500)',
	status:false
},
{
	package:'12 month,($7500)($2500)',
	status:false
}]
packages
break_id
variations:any
packageActivate:boolean=false
dd:any
mm:any
today
current_status
  constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService,public popoverController:PopoverController,public modalController:ModalController) {
    this.packages={};
    this.dataService.tabPage="package";
	var today = new Date();
this.dd = today.getDate();

this.mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(this.dd<10) 
{
    this.dd='0'+this.dd;
} 

if(this.mm<10) 
{
    this.mm='0'+this.mm;
} 
this.today = yyyy+'-'+this.mm+'-'+this.dd
    console.log(this.today);
     }

 	ngOnInit() {
 		// localStorage['userId']
 		var userId={
 			user_id:this.dataService.userData.id
 		}
		this.loadingService.present()
		this.apiService.userPackage(userId).subscribe(data => {
			if (data.status_code == 200) {
        this.loadingService.dismiss()
        console.log('PACKAGE DATA', data.result);
				this.packages = data.result.package_detail;
				this.variations=data.result.variation;
        ////status =2 means breakend status=1 means break continue
        if (this.packages.break.status) {
          this.break_id=this.packages.break.status==2?'':this.packages.break.break_id
        
        this.value=this.packages.break.status==2?false:true
        }
        else{
          this.value=false
        }

        if(this.packages.break.status == 2){
          this.current_status =  'On-Hold';  
        }
        else{
          this.current_status = 'Active';
        }
 
			} else {
				this.loadingService.dismiss()
				this.alertService.presentAlert('Alert', data.result);
        this.packages=[]
       this.variations=[]
			}
		}, err => {
			this.loadingService.dismiss()
			this.alertService.presentAlert('Alert', 'Something went wrong...')
		})
	}
  onBreak(val){
    console.log(val,this.value);
     var userId={
       user_id:this.dataService.userData.id,
       current_package_id:this.packages.current_package_id,
       type:val,
       date:this.today,
       break_id:this.break_id
     }
    this.loadingService.present()
    this.apiService.onBreak(userId).subscribe(data => {
      if (data.status_code == 200) {
        this.loadingService.dismiss()
        this.ngOnInit();
      } else {
        this.loadingService.dismiss()
        this.alertService.presentAlert('Alert', data.result);
      }
    }, err => {
      this.loadingService.dismiss()
      this.alertService.presentAlert('Alert', 'Something went wrong...')
    })
  }
	async presentPopover(ev: any) {
    const popover = await this.popoverController.create({
      component: PackageUpgradeComponent,
      event: ev,
      translucent: true
    });
    return await popover.present();
  }
  showPackage(){
   this.packageActivate=!this.packageActivate;
  }
  ionViewDidEnter(){
    console.log("ionViewDidEnter package");
    this.ngOnInit();
  }
  async upgradePackage(variation_id,
duration_price_inr,duration_price_usd){
	var payment_price=duration_price_inr-this.packages.current_package_amount;
  var payment_price_usd=duration_price_usd-this.packages.current_package_amount_usd;
  console.log("payment_price_usd",payment_price_usd);
	console.log(payment_price);
    const modal = await this.modalController.create({
      component: UpgradePaymentPackageComponent,
      componentProps: { payment_price:payment_price,payment_price_usd:payment_price_usd,service_id:this.packages.service_id,variation_id:variation_id }
    });
     modal.onDidDismiss()
      .then((data:any) => {
        console.log("data",data);
        if (data.data.role=="manual") {
          this.manual(data.data.role,variation_id,this.packages.current_package_id,data.data.role,data.data.id,payment_price,payment_price_usd);
        }
        if (data.data.role=="payu" || data.data.role=="paypal" ||data.data.role=="manual") {
              if (data.data.status==true) {
               
        console.log(data.data.status);
        var pay={
          user_id:this.dataService.userData.id,
           service_id:this.packages.service_id,
           variation_id:variation_id,
           current_package_id:this.packages.current_package_id,
           payment_mode:data.data.role,
           payment_id:data.data.id,
           payment_price_inr:payment_price,
           payment_price_usd:payment_price_usd
        }
        console.log(pay);
         this.apiService.upgradePackage(pay).subscribe(data=>{
      if(data.status_code==200){
       //this.ngOnInit();
       this.successCall();
      }else{
        this.alertService.presentAlert('Alert',data.result);  
      }
    },err=>{
    this.loadingService.dismiss()
      this.alertService.presentAlert('Alert','Something went wrong...')
    })
        }
        }
        
      
    });
    return await modal.present();
   
  }
   async manual(value,variation_id,current_package_id,payment_mode,payment_id,payment_price,payment_price_usd){
  const popover = await this.popoverController.create({
      component: ManualPaymentPopoverComponent,
      event: value,
      translucent: true
    });
    popover.onDidDismiss()
      .then((data: any) => {
        console.log(data);
                var pay={
          user_id:this.dataService.userData.id,
           service_id:this.packages.service_id,
           variation_id:variation_id,
           current_package_id:current_package_id,
           payment_mode:payment_mode,
           payment_id:payment_id,
           payment_price_inr:payment_price,
           payment_price_usd:payment_price_usd
        }
        console.log(pay);
         this.apiService.upgradePackage(pay).subscribe(data=>{
      if(data.status_code==200){
       this.customalert();
      }else{
        this.alertService.presentAlert('Alert',data.result);  
      }
    },err=>{
    this.loadingService.dismiss()
      this.alertService.presentAlert('Alert','Something went wrong...')
    })
      });
    return await popover.present();
  }
    customalert(){
    this.alertService.presentAlert('Alert', 'Your Payment will be approved by Dietitian, after the successful payment from your side.')
   // this.submit();
  }
  info(){
    this.navController.navigateForward('help');
  }
  services(){
    this.navController.navigateForward('servicesSide');
  }
    async successCall() {
    const popover = await this.popoverController.create({
      component: TransactionComponent,
      translucent: true
    });
    popover.onDidDismiss()
      .then((data: any) => {
        console.log(data);
        if (data.data.status == true) {
          console.log(data);
          this.ngOnInit();
        } else {
          console.log('false');
        }
      });
    return await popover.present();
  }

}
