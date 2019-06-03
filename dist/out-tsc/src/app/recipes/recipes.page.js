var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService, LoadingService, AlertService, DataService } from '../shared/index';
var RecipesPage = /** @class */ (function () {
    function RecipesPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
    }
    RecipesPage.prototype.ngOnInit = function () {
        var _this = this;
        this.loadingService.present();
        this.apiService.recipe_list().subscribe(function (data) {
            if (data.status_code == 200) {
                _this.loadingService.dismiss();
                var sortedRecipes = data.result.sort(function (a, b) {
                    var titleA = a.title.toLowerCase(), titleB = b.title.toLowerCase();
                    if (titleA < titleB) //sort string ascending
                        return -1;
                    if (titleA > titleB)
                        return 1;
                    return 0; //default return value (no sorting)
                });
                _this.recipes = sortedRecipes;
                _this.recipe_list = sortedRecipes;
                console.log('RECIPE DATA', _this.recipes);
            }
            else {
                _this.loadingService.dismiss();
                _this.alertService.presentAlert('Alert', data.result);
            }
        }, function (err) {
            _this.loadingService.dismiss();
            _this.alertService.presentAlert('Alert', 'Something went wrong...');
        });
    };
    RecipesPage.prototype.onRecipes = function (data) {
        this.dataService.data = data;
        this.navController.navigateForward('recipe-details');
    };
    RecipesPage.prototype.info = function () {
        this.navController.navigateForward('help');
    };
    RecipesPage.prototype.onInput = function (value) {
        var _this = this;
        console.log(value);
        if (this.myInput == null || this.myInput == '') {
            this.recipe_list = this.recipes;
        }
        else {
            if (this.myInput && this.myInput.trim() != '') {
                this.recipe_list = this.recipes.filter(function (item) {
                    return (item.title.toLowerCase().indexOf(_this.myInput.toLowerCase()) > -1);
                });
            }
        }
    };
    RecipesPage.prototype.onclear = function (event) {
        console.log('in CLEAR TEXT', event);
    };
    RecipesPage.prototype.onCancel = function (value) { };
    RecipesPage = __decorate([
        Component({
            selector: 'app-recipes',
            templateUrl: './recipes.page.html',
            styleUrls: ['./recipes.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], RecipesPage);
    return RecipesPage;
}());
export { RecipesPage };
//# sourceMappingURL=recipes.page.js.map