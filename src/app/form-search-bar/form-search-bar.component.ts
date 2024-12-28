import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ListProduct } from '../DTO/ListProduct';
import { MealIngredient } from '../DTO/MealIngredient';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { MealService } from '../services/meal.service';
import { ProductService } from '../services/product.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-form-search-bar',
  templateUrl: './form-search-bar.component.html',
  styleUrls: ['./form-search-bar.component.scss'],
  // encapsulation: ViewEncapsulation.ShadowDom
})
export class FormSearchBarComponent  implements OnInit {

  @ViewChild('popover') popover: any;
  isPopoverOpen: boolean = false;

  @Input() type: string = "product";
  @Input() fatherItemId: number = -1;
  /* En este caso, alreadyChosenItems y alreadyChosenMeals son aquellas que ya 
  se encuentran en lista, cuando se va a aumentar los productos de la misma
  y se utilizan para bloquear los productos que ya no pueden escogerse*/
  @Input() alreadyChosenItems: any[] = [];
  // @Input() alreadyChosenMeals: any[];

  @Input() newItems: any[] = [];
  @Input({transform: booleanAttribute}) resetUsedMeals: boolean = true;
  matches: any[] = [];
  /* Esta variable hace referencia a las recetas escogidas, cuyos productos se encuentran en memoria
  y que aun no han sido agregados a la lista, pero ya se seleccionaron en la barra de búsqueda*/
  newMeals: number[] = [];
  
  @Output() addedProduct = new EventEmitter<any>();
  @Output() removedMeal = new EventEmitter<any>();

  searchType: string = "product";
  placeholder: string = "Buscar Productos";

  constructor(private productService: ProductService,
    private mealService: MealService,
    private ingredientService: MealIngredientService,
    private utils: UtilsService) { }

  ngOnInit(){
    
  }

  setSearchType(event: any){
    this.searchType = event.target.value;
  }

  changeSearchType(){
    if(this.type != "product"){
      return;
    }
    if(this.searchType == "product"){
      this.searchType = "meal";
      this.placeholder = "Buscar Recetas";
      return;
    }
    this.searchType = "product";
    this.placeholder = "Buscar Productos";
  }

  private loadMatches(){
    if(this.resetUsedMeals){
      this.newMeals = [];
    }

    if(this.searchType == "product"){
      this.productService.getProducts().subscribe(serverAnswer => {
        this.matches = serverAnswer;
        this.isPopoverOpen = true;
      });
      return;
    }
    this.mealService.getMeals().subscribe(serverAnswer => {
      this.matches = serverAnswer;
      this.isPopoverOpen = true;
    });
  }

  search(event: any){
    const searchWord: string = event.target.value.trim().toLowerCase();
    if(searchWord != ''){
      
      if(this.searchType == "product"){
        this.productService.getMatchingProducts(searchWord).subscribe(serverAnswer => {
          this.matches = serverAnswer;
          this.isPopoverOpen = true;
        });
        return;
      }

      this.mealService.getMatchingMeals(searchWord).subscribe(serverAnswer => {
        this.matches = serverAnswer;
        this.isPopoverOpen = true;
      });
      return;
    }
    this.loadMatches();
  }

  showPopover(event: Event){
    this.loadMatches();
    this.popover.event = event;
  }

  clearSearch(){
    this.productService.getProducts().subscribe(serverAnswer => {
      this.matches = serverAnswer;
    });
  }

  addToList(id: number){
    /* Emite el evento para el cambio de la pantalla de no data, a la que si tiene los datos */
    this.addedProduct.emit();
    this.isPopoverOpen = false;

    const newItem = this.matches.find(wantedItem => {
      return wantedItem.id == id;
    });

    if(this.searchType == "product"){
      this.addProductToList(newItem);
      return;
    }
    this.addMealToList(newItem);
    this.newMeals.push(id);
    // this.alreadyChosenMeals.push(id);
  }

  isChosen(id: number): boolean{ 
    if(this.type == "product"){
      return this.isChosenProduct(id);
    }
    return this.isChosenIngredient(id);
  }

  private isChosenProduct(id: number): boolean{
    if(this.fatherItemId != -1){
      if(this.searchType == "product"){
        return this.alreadyChosenItems.find(product => {
          return product.productId == id;
        }) == undefined ? false : true;
      }
      // return this.alreadyChosenMeals.find(mealId => {
      //   return mealId == id;
      // }) == undefined ? false : true;
    }
    if(this.searchType == "product"){
      return this.newItems.find(product => {
        return product.productId == id;
      }) == undefined ? false : true;
    }
    return this.newMeals.find(mealId => {
      return mealId == id;
    }) == undefined ? false : true;
  }

  private isChosenIngredient(id: number): boolean{
    if(this.fatherItemId != -1){
      return this.alreadyChosenItems.find(product => {
        return product.ingredientId == id;
      }) == undefined ? false : true;
    }
    return this.newItems.find(product => {
      return product.ingredientId == id;
    }) == undefined ? false : true;
  }

  mealDeselected(mealId: number){
    if(this.type == "product" && this.searchType == "meal"){
      this.ingredientService.getIngredients(mealId).subscribe(serverAnswer => {
        this.newMeals.splice(this.newMeals.findIndex(actualMealId => {return actualMealId == mealId}),1);
        this.removedMeal.emit(serverAnswer);
        return;
      });
    }
  }

  private addMealToList(newMeal: any){
    this.ingredientService.getIngredients(newMeal.id).subscribe(serverAnswer => {
      const fatherItemId = this.fatherItemId == -1 ? null : this.fatherItemId;
      serverAnswer.forEach( (ingredient: any) => {
        /*Vaidar que no se repitan productos*/
        let productExists: any = undefined;
        if(newMeal.type == 'D'){
          productExists = this.newItems.find(product => {
            return product.productId == ingredient.ingredientId
          });
        }
        if(productExists == undefined){
          this.newItems.push(new ListProduct(fatherItemId,ingredient.ingredientId,ingredient.name,ingredient.alias1,ingredient.alias2,
            ingredient.alias3,ingredient.image,ingredient.quantity,ingredient.measurement,ingredient.measurementUnit,
            ingredient.productBrand,ingredient.ingredientBrand,ingredient.estimatedCost,null,ingredient.mealId));
        }
      });
    });
  }

  private addProductToList(newListItem: any){
    const fatherItemId = this.fatherItemId == -1 ? null : this.fatherItemId;
    /* this.alreadyChosenItems.push(this.newItems[this.newItems.length - 1]); indica que al array de productos que se escogieron
    en la lista, se agregan los nuevos, esto debido a que este array es el que se usa para bloquear la opción de selección */
    if(this.type == "meal"){
      this.newItems.push(new MealIngredient(fatherItemId,newListItem!.id,newListItem!.name, newListItem?.alias1,
        newListItem?.alias2, newListItem?.alias3, newListItem?.image,1,null,null,newListItem?.brand,
        null,null));
      this.alreadyChosenItems.push(this.newItems[this.newItems.length - 1]);
      return;
    }
    this.newItems.push(new ListProduct(fatherItemId,newListItem!.id,newListItem!.name, newListItem?.alias1,
      newListItem?.alias2, newListItem?.alias3, newListItem?.image,1,null,null,newListItem?.brand,
      null,null,null,0));
    this.alreadyChosenItems.push(this.newItems[this.newItems.length - 1]);
  }

  getAlias(match: any){
    return this.utils.placeAliasCommas([match.alias1,match.alias2,match.alias3]);
  }
}
