import { Component, OnInit } from '@angular/core';
import { NavController,IonContent } from '@ionic/angular'
import { ApiService,LoadingService,AlertService,DataService} from '../shared/index'

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.page.html',
  styleUrls: ['./recipes.page.scss'],
})


export class RecipesPage implements OnInit {
	recipes
	recipe_list
	myInput
	constructor(public apiService: ApiService,
		public loadingService: LoadingService,
		public dataService: DataService,
		public navController: NavController,
		public alertService: AlertService) {}

	ngOnInit() {
		this.loadingService.present()
		this.apiService.recipe_list().subscribe(data => {
			if (data.status_code == 200) {
				this.loadingService.dismiss()
				var sortedRecipes=data.result.sort(function (a, b) {
					var titleA = a.title.toLowerCase(),
						titleB = b.title.toLowerCase()
					if (titleA < titleB) //sort string ascending
						return -1
					if (titleA > titleB)
						return 1
					return 0 //default return value (no sorting)
				})

				this.recipes = sortedRecipes;
				 this.recipe_list = sortedRecipes;
				console.log('RECIPE DATA', this.recipes);


			} else {
				this.loadingService.dismiss()
				this.alertService.presentAlert('Alert', data.result);
			}
		}, err => {
			this.loadingService.dismiss()
			this.alertService.presentAlert('Alert', 'Something went wrong...')
		})
	}
	onRecipes(data) {
		this.dataService.data = data;
		this.navController.navigateForward('recipe-details');
	}
	info() {
		this.navController.navigateForward('help');
	}

	onInput(value) {
		console.log(value)
		if (this.myInput == null || this.myInput == '') {
			this.recipe_list = this.recipes;
		} else {
			if (this.myInput && this.myInput.trim() != '') {
				this.recipe_list = this.recipes.filter((item) => {
					return (item.title.toLowerCase().indexOf(this.myInput.toLowerCase()) > -1);
				})
			}
		}
	}

	onclear(event) {
		console.log('in CLEAR TEXT', event);
	}

	onCancel(value) {}

}

