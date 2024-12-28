import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealIngredientFormRoutingModule } from './meal-ingredient-form-routing.module';
import { MealIngredientFormComponent } from './meal-ingredient-form.component';
import { MealIngredientItemModule } from '../meal-ingredient-item/meal-ingredient-item.module';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { FormSearchBarModule } from '../form-search-bar/form-search-bar.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';


@NgModule({
  declarations: [
    MealIngredientFormComponent
  ],
  imports: [
    CommonModule,
    MealIngredientFormRoutingModule,
    IonicModule,
    MealIngredientItemModule,
    FormsModule,
    FormSearchBarModule,
    BackButtonModule,
    EmptyDataModule
  ]
})
export class MealIngredientFormModule { }
