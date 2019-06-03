import { Component, OnInit } from '@angular/core';
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'

@Component({
  selector: 'app-service-testimonial-detail',
  templateUrl: './service-testimonial-detail.page.html',
  styleUrls: ['./service-testimonial-detail.page.scss'],
})
export class ServiceTestimonialDetailPage implements OnInit {
  testimonial_detail
  constructor(public dataService: DataService) { }

  ngOnInit() {
   this.testimonial_detail =  this.dataService.data;
   console.log(this.testimonial_detail);

  }
  getSize(val){
  	   var img = new Image();
   img.onload = function() {
  alert(img.width + 'x' + img.height);
}
img.src = val;
  }

}
