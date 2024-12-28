import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealFormComponent } from './meal-form.component';

const routes: Routes = [
  {
    path: '',
    component: MealFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealFormRoutingModule { }
