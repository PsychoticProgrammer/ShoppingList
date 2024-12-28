import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MealIngredient } from '../DTO/MealIngredient';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { MealService } from '../services/meal.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.scss'],
})
export class MealDetailComponent  implements OnInit {

  meal: any = {};
  mealIngredients: MealIngredient[] = [];
  existData: boolean = false;
  existMatches: boolean = true;

  constructor(private mealService: MealService,
    private mealIngredientService: MealIngredientService,
    private route: ActivatedRoute,
    private utils: UtilsService){
    this.loadMealInfo();
    this.loadIngredients();
  }

  ngOnInit() {}

  ionViewWillEnter(){
    this.loadIngredients();
  }

  private loadMealInfo(){
    this.mealService.getMeal(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe(serverAnswer => {
      this.meal = serverAnswer;
    });
  }

  private loadIngredients(){
    this.mealIngredientService.getIngredients(parseInt(this.route.snapshot.paramMap.get("id")!)).subscribe(serverAnswer => {
      this.existData = serverAnswer.length != 0;
      this.existMatches = true;
      this.mealIngredients = [];
      serverAnswer.forEach( (ingredient: any) => {
        this.mealIngredients.push(new MealIngredient(ingredient.mealId, ingredient.ingredientId, ingredient.name, ingredient.alias1,
          ingredient.alias2, ingredient.alias3, ingredient.image, ingredient.quantity, ingredient.measurement,
          ingredient.measurementUnit, ingredient.productBrand, ingredient.ingredientBrand, ingredient.estimatedCost));
      });
    });
  }

  search(event: any){
    const searchWord = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      this.mealIngredientService.getMatchingIngredients(this.meal.id, searchWord).subscribe(serverAnswer => {
        this.existMatches = serverAnswer.length != 0;
        this.existData = true;
        this.mealIngredients = [];
        serverAnswer.forEach( (ingredient: any) => {
          this.mealIngredients.push(new MealIngredient(ingredient.mealId, ingredient.ingredientId, ingredient.name, ingredient.alias1,
            ingredient.alias2, ingredient.alias3, ingredient.image, ingredient.quantity, ingredient.measurement,
            ingredient.measurementUnit, ingredient.productBrand, ingredient.ingredientBrand, ingredient.estimatedCost));
        });
      });
      return;
    }
    this.loadIngredients();
  }

  clearSearch(){
    this.loadIngredients();
  }

  reloadIngredients(){
    this.loadIngredients();
  }

  getAlias(){
    return this.utils.placeAliasCommas([this.meal.alias1, this.meal.alias2, this.meal.alias3]);
  }
}
