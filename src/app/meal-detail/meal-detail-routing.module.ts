import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealDetailComponent } from './meal-detail.component';

const routes: Routes = [
  {
    path: '',
    component: MealDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealDetailRoutingModule { }
