import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index';
import { NavController,IonContent } from '@ionic/angular';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.page.html',
  styleUrls: ['./faqs.page.scss'],
})
export class FaqsPage implements OnInit {
	buttonIcon: string = "add";
	faqs

	value = null;
	constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService) {}

	ngOnInit() {
		this.loadingService.present()
		this.apiService.faq_list().subscribe(data => {
			if (data.status_code == 200) {
				this.loadingService.dismiss()
				this.faqs = data.result;
			} else {
				this.loadingService.dismiss()
				this.alertService.presentAlert('Alert', data.result);
			}
		}, err => {
			this.loadingService.dismiss()
			this.alertService.presentAlert('Alert', 'Something went wrong...')
		})
	}

	enable(index,status){
    console.log(index,status);
  for(var i=0;i<this.faqs.length;i++){
           this.faqs[i].status=1;
        }
    if (this.faqs[index].status==0) {
    	this.faqs[index].status=1
    }
    else{
    	this.faqs[index].status=0;
    }
     console.log("faqc",this.faqs);
    // if (this.faqs[index].status==1) {
    // 	this.faqs[index].status=0
    // }
    // else{
    // 	this.faqs[index].status=1;
    // }
	}
	funcicon(val){
     if (val==0) {
     	return 'remove'
     }
     else{
      return 'add'
     }
	}
	info(){
		this.navController.navigateForward('help');
  }

}