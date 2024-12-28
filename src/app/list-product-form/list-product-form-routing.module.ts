import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListProductFormComponent } from './list-product-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListProductFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListProductFormRoutingModule { }
