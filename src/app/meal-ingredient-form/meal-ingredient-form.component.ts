import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealIngredient } from '../DTO/MealIngredient';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { QuickProductCreationService } from '../services/quick-product-creation.service';

@Component({
  selector: 'app-meal-ingredient-form',
  templateUrl: './meal-ingredient-form.component.html',
  styleUrls: ['./meal-ingredient-form.component.scss'],
})
export class MealIngredientFormComponent  implements OnInit {

  newIngredients: MealIngredient[] = [];
  mealId: number;
  existData: boolean = false;
  existMatches: boolean = false;

  alreadyChosenProducts: MealIngredient[];

  @ViewChild('list') list: any;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private ingredientService: MealIngredientService,
    private quickCreation: QuickProductCreationService) {
    this.mealId = parseInt(this.route.snapshot.paramMap.get("id")!);
    this.loadAlreadyChosenProducts();
  }

  ngOnInit(){}

  ionViewWillEnter(){
    /*Si se viene de una creación rápida, se reasignan los productos nuevos, que ya contienen el nuevo producto,
    y además se aumenta este producto que está en la última posición, al vector de productos que no están disponibles */
    if(this.quickCreation.isQuickCreation){
      this.newIngredients = this.quickCreation.getSavedProducts();
      this.alreadyChosenProducts.push(this.newIngredients[this.newIngredients.length - 1]);
      this.addedProduct();
    }
  }

  goToProductForm(){
    const lastPage = "meal-ingredient-form/" + this.mealId;
    this.quickCreation.goToQuickProductCreation("meal",lastPage,this.newIngredients);
  }

  loadAlreadyChosenProducts(){
    this.ingredientService.getIngredients(this.mealId).subscribe(serverAnswer => {
      this.alreadyChosenProducts = serverAnswer;
    });
  }

  removeFromList(id: number){
    this.newIngredients.splice(this.newIngredients.findIndex( product => {return product.ingredientId == id}),1);
    this.alreadyChosenProducts.splice(this.alreadyChosenProducts.findIndex(product => {return product.ingredientId == id}),1);
    this.existData = this.newIngredients.length != 0;
    this.existMatches = true;
  }

  saveIngredients(){
    this.ingredientService.insertIngredients(this.newIngredients).subscribe(() => {
      this.router.navigate(["meal/"+this.mealId]);
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
