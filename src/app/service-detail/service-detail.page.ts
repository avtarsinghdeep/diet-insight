import { Component, OnInit,ViewChild } from '@angular/core';
import { NavController,IonContent,MenuController } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-service-detail',
  templateUrl: './service-detail.page.html',
  styleUrls: ['./service-detail.page.scss'],
})
export class ServiceDetailPage implements OnInit {
 @ViewChild(IonContent) content: IonContent;
	service=null;
	plan:any=null;
	section: string;
  feature_selected:number=0;
  faqs
  testimonials
  service_id
  buypack_service_id
  has_package
  constructor(public apiService:ApiService,
			public loadingService:LoadingService,
			public dataService:DataService,
			public navController:NavController,
			public alertService:AlertService,private menuController: MenuController) { 
				this.section = "description";
        console.log("upgrade_status",this.dataService.upgrade_status);
        
        if (this.dataService.pageType=="sidemenu") {
          this.menuController.enable(true,'first')
        }
        else{
          this.menuController.enable(false,'first')
        }

			}

  ngOnInit() {
    this.service=this.dataService.data;
    this.service_id = this.dataService.data.service_id;
    this.buypack_service_id = localStorage.getItem('buypack_service_id');
    this.has_package = localStorage.getItem('has_package');
    console.log('SERVICES ', this.service_id, this.buypack_service_id);
    console.log('has_package',this.has_package)
    
    //faq's
    this.apiService.faq_list().subscribe(data => {
			if (data.status_code == 200) {
				this.loadingService.dismiss()
        var p;
        var myArrayFAQ=[]
        for(var i=0;i<data.result.length;i++){
           p=data.result[i];
           p.FAQSTATUS=false
           myArrayFAQ.push(p)
        }
				this.faqs = myArrayFAQ;
        console.log("faq",this.faqs);
			} else {
				this.loadingService.dismiss()
				this.alertService.presentAlert('Alert', data.result);
			}
		}, err => {
			this.loadingService.dismiss()
			this.alertService.presentAlert('Alert', 'Something went wrong...')
    })

    this.testimonials=this.dataService.data.testimonials;
    console.log("services testimonial data is", this.testimonials);
    
  }
  packageSelect(value){
  	this.plan=value;
  	setTimeout(()=>{
  		this.content.scrollToBottom();
  	},100)
  }
  buy(plan,index){
    this.dataService.data.variation_id=plan.variation_id;
  	this.dataService.data.variation_index=index;
    this.navController.navigateForward('term-conditions');
  	// this.navController.navigateForward('payment');
  }

  enableFAQ(index,status){
      for(var i=0;i<this.faqs.length;i++){
           this.faqs[i].FAQSTATUS=false;
        }
    if (this.faqs[index].FAQSTATUS==true) {
    	this.faqs[index].FAQSTATUS=false
    }
    else{
    	this.faqs[index].FAQSTATUS=true;
    }
    console.log("faqc",this.faqs);
	}
	funcicon(val){
     if (val==true) {
     	return 'remove'
     }
     else{
      return 'add'
     }
	}

  info(){
    this.navController.navigateForward('help');
  }

  onTestimonials(data) {
		this.dataService.data = data;
		this.navController.navigateForward('service-testimonial-detail');
	}

}
