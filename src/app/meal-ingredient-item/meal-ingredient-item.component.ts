import { booleanAttribute, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MealIngredient } from '../DTO/MealIngredient';
import { MealIngredientService } from '../services/meal-ingredient.service';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-meal-ingredient-item',
  templateUrl: './meal-ingredient-item.component.html',
  styleUrls: ['./meal-ingredient-item.component.scss'],
})
export class MealIngredientItemComponent  implements OnInit {

  @Input({ transform: booleanAttribute }) isMealCreated: boolean;
  @Input() ingredient: MealIngredient;
  isModalOpen: boolean = false;
  isConfirmModalOpen: boolean = false;

  isImageViewerOpen: boolean = false;

  @Output() removedIngredient  = new EventEmitter<number>();

  constructor(private ingredientService: MealIngredientService,
    private utils: UtilsService) { }

  ngOnInit() {}

  removeIngredient(){
    if(this.isMealCreated){
      this.ingredientService.deleteIngredient(this.ingredient.mealId, this.ingredient.ingredientId).subscribe(() => {
        this.removedIngredient.emit(0);
      });
      return;
    }
    this.removedIngredient.emit(this.ingredient.ingredientId);
  }

  open_close_modal(){
    this.isModalOpen = !this.isModalOpen;
  }

  open_close_confirm_modal(){
    if(this.isMealCreated){
      this.isConfirmModalOpen = !this.isConfirmModalOpen;
      return;
    }
    this.removeIngredient();
  }

  open_close_ImageViewer(){
    this.isImageViewerOpen = !this.isImageViewerOpen;
  }

  getAlias(){
    return this.utils.placeAliasCommas([this.ingredient.alias1,this.ingredient.alias2,this.ingredient.alias3]);
  }

  isNotNull(value: any){
    return value != null ? true : false;
  }
}
