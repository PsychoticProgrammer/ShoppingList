import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealDetailRoutingModule } from './meal-detail-routing.module';
import { MealDetailComponent } from './meal-detail.component';
import { IonicModule } from '@ionic/angular';
import { MealIngredientItemModule } from '../meal-ingredient-item/meal-ingredient-item.module';
import { NavigationTabModule } from '../navigation-tab/navigation-tab.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { TypePipeModule } from '../pipes/type-pipe.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';



@NgModule({
  declarations: [
    MealDetailComponent
  ],
  imports: [
    CommonModule,
    MealDetailRoutingModule,
    IonicModule,
    MealIngredientItemModule,
    NavigationTabModule,
    AddButtonModule,
    BackButtonModule,
    TypePipeModule,
    EmptyDataModule
  ]
})
export class MealDetailModule { }
