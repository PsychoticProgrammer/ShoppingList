import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealRoutingModule } from './meal-routing.module';
import { IonicModule } from '@ionic/angular';
import { MealComponent } from './meal.component';
import { MealItemModule } from '../meal-item/meal-item.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';



@NgModule({
  declarations: [
    MealComponent
  ],
  imports: [
    CommonModule,
    MealRoutingModule,
    IonicModule,
    MealItemModule,
    AddButtonModule,
    EmptyDataModule
  ]
})
export class MealModule { }
