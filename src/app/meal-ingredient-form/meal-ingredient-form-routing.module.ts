import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealIngredientFormComponent } from './meal-ingredient-form.component';

const routes: Routes = [
  {
    path: '',
    component: MealIngredientFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealIngredientFormRoutingModule { }
