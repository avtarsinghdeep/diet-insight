import { Component, OnInit } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'
@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.page.html',
  styleUrls: ['./recipe-details.page.scss'],
})
export class RecipeDetailsPage implements OnInit {
recipes
ingredients
  constructor(public apiService:ApiService,
			public loadingService:LoadingService,
			public dataService:DataService,
			public navController:NavController,
			public alertService:AlertService) { }

  ngOnInit() {
  	this.recipes=this.dataService.data;
  	this.ingredients=JSON.parse(this.recipes.ingredients);
  	console.log(this.recipes);
  }
  JsonParse(data){
   return JSON.parse(data);
  }
  info(){
    this.navController.navigateForward('help');
  }

}
