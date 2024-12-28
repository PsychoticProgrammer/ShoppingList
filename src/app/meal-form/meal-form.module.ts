import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealFormRoutingModule } from './meal-form-routing.module';
import { MealFormComponent } from './meal-form.component';
import { IonicModule } from '@ionic/angular';
import { MealIngredientItemModule } from '../meal-ingredient-item/meal-ingredient-item.module';
import { FormsModule } from '@angular/forms';
import { FormSearchBarModule } from '../form-search-bar/form-search-bar.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';


@NgModule({
  declarations: [
    MealFormComponent
  ],
  imports: [
    CommonModule,
    MealFormRoutingModule,
    IonicModule,
    MealIngredientItemModule,
    FormsModule,
    FormSearchBarModule,
    BackButtonModule,
    EmptyDataModule
  ]
})
export class MealFormModule { }
