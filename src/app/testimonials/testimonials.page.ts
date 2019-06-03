import { Component, OnInit } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.page.html',
  styleUrls: ['./testimonials.page.scss'],
})
export class TestimonialsPage implements OnInit {
    testimonials
    constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService) { }

    ngOnInit() {
        this.loadingService.present()
		this.apiService.testimonial_list().subscribe(data => {
			if (data.status_code == 200) {
				this.loadingService.dismiss()
				this.testimonials = data.result;
			} else {
				this.loadingService.dismiss()
				this.alertService.presentAlert('Alert', data.result);
			}
		}, err => {
			this.loadingService.dismiss()
			this.alertService.presentAlert('Alert', 'Something went wrong...')
		})
    }
    onTestimonials(data) {
		this.dataService.data = data;
		this.navController.navigateForward('testimonial-detail');
	}
	  notification(){
    this.navController.navigateForward('notification');
  }
  info(){
    this.navController.navigateForward('help');
  }
  onReview(){
  	window.open('https://goo.gl/bNLFP9','_blank');
  }
}
