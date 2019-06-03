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
var RecipeDetailsPage = /** @class */ (function () {
    function RecipeDetailsPage(apiService, loadingService, dataService, navController, alertService) {
        this.apiService = apiService;
        this.loadingService = loadingService;
        this.dataService = dataService;
        this.navController = navController;
        this.alertService = alertService;
    }
    RecipeDetailsPage.prototype.ngOnInit = function () {
        this.recipes = this.dataService.data;
        this.ingredients = JSON.parse(this.recipes.ingredients);
        console.log(this.recipes);
    };
    RecipeDetailsPage.prototype.JsonParse = function (data) {
        return JSON.parse(data);
    };
    RecipeDetailsPage = __decorate([
        Component({
            selector: 'app-recipe-details',
            templateUrl: './recipe-details.page.html',
            styleUrls: ['./recipe-details.page.scss'],
        }),
        __metadata("design:paramtypes", [ApiService,
            LoadingService,
            DataService,
            NavController,
            AlertService])
    ], RecipeDetailsPage);
    return RecipeDetailsPage;
}());
export { RecipeDetailsPage };
//# sourceMappingURL=recipe-details.page.js.map