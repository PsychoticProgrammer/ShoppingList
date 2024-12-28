import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MealIngredient } from '../DTO/MealIngredient';
import { Product } from '../DTO/Product';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { MealService } from '../services/meal.service';
import { ProductService } from '../services/product.service';
import { QuickProductCreationService } from '../services/quick-product-creation.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-meal-form',
  templateUrl: './meal-form.component.html',
  styleUrls: ['./meal-form.component.scss'],
})
export class MealFormComponent  implements OnInit {

  newMealIngredients: MealIngredient[] = [];
  existData: boolean = false;
  existMatches: boolean = true;

  isErrorAlertOpen: boolean = false;
  acceptAlertButton = ["Aceptar"];
  errorDescription: string = "";

  name: string = "";
  alias: string = "";
  type: string = "";

  @ViewChild('list') list: any;

  constructor(private router: Router,
    private mealIngredientService: MealIngredientService,
    private mealService: MealService,
    private utils: UtilsService,
    private quickCreation: QuickProductCreationService) { }

  ngOnInit() {}

  ionViewWillEnter(){
    /*Si se viene de una creación rápida, se reasignan los productos nuevos, que ya contienen el nuevo producto */
    if(this.quickCreation.isQuickCreation){
      this.newMealIngredients = this.quickCreation.getSavedProducts();
      this.addedProduct();
    }
  }

  goToProductForm(){
    this.quickCreation.goToQuickProductCreation("meal",'meal-form',this.newMealIngredients);
  }

  closeAlert(){
    this.isErrorAlertOpen = false;
  }

  removeFromList(id: number){
    this.newMealIngredients.splice(this.newMealIngredients.findIndex( product => {return product.ingredientId == id}),1);
    this.existData = this.newMealIngredients.length != 0;
    this.existMatches = true;
  }

  setType(event: any){
    this.type = event.target.value;
  }

  saveMeal(){
    if(this.name == ""){
      this.isErrorAlertOpen = true;
      this.errorDescription = "Debe Proporcionar un Nombre para la Receta";
      return;
    } else if(this.type == ""){
      this.isErrorAlertOpen = true;
      this.errorDescription = "Debe Proporcionar un Tipo de Receta";
      return;
    }

    const alias = this.alias.split(",");
    const mealInfo = {
      name: this.name,
      alias1: this.utils.convertToEmptyString(alias[0]),
      alias2: this.utils.convertToEmptyString(alias[1]),
      alias3: this.utils.convertToEmptyString(alias[2]),
      type: this.type
    }
    this.mealService.insertMeal(mealInfo).subscribe(serverAnswer => {
      this.newMealIngredients.forEach(ingredient => {
        ingredient.mealId = serverAnswer.mealId
      });
      this.mealIngredientService.insertIngredients(this.newMealIngredients).subscribe(() => {
        this.router.navigate(['meal']);
      });
    });
  }

  addedProduct(){
    this.existData = true;
    this.existMatches = true;
    setTimeout(() => {
      this.list.scrollToBottom(300);
    },100);
  }
}
