import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
import { RecipeDetailsPage } from '../recipe-details/recipe-details.page';

enum COLORS {
  GREY = "#bfbaba",
  GREEN = "#76FF03",
  YELLOW = "#FFCA28",
  RED = "#DD2C00"
}


@Component({
  selector: 'app-testimonial-detail',
  templateUrl: './testimonial-detail.page.html',
  styleUrls: ['./testimonial-detail.page.scss'],
})
export class TestimonialDetailPage implements OnInit {

  @Input() rating: number ;

  stars: string[] = [];

  @Output() ratingChange: EventEmitter<number> = new EventEmitter();
  testimonials

  constructor(public apiService:ApiService,
    public loadingService:LoadingService,
    public dataService:DataService,
    public navController:NavController,
    public alertService:AlertService) { }

  ngOnInit() {
    this.testimonials=this.dataService.data;
  
    console.log(this.testimonials);

    this.stars = this.printRating(this.testimonials.rating);
  }

getColor(index: string) {

    if(index == 'star-outline'){
      return COLORS.GREY;
    }
    if(this.stars){
      return COLORS.YELLOW;
    }

  }
   notification(){
    this.navController.navigateForward('notification');
  }
  info(){
    this.navController.navigateForward('help');
  }

printRating (rating) {

  let max_rate = 5;
  let rounded_rating = Math.round(rating);
  let array_stars    = new Array(max_rate);
  array_stars.fill('star-outline');


  for(let i=0; i < rounded_rating; i++) {
    array_stars[i] = 'star';
    

    if(i === rounded_rating - 1 && rating % 1 !== 0) {
      array_stars[i] = 'star-half';
    }
  }

  return array_stars;
}

onLink(val){
  window.open(val);
  }
}
