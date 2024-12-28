import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFormComponent } from './list-form.component';

const routes: Routes = [
  {
    path: '',
    component: ListFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListFormRoutingModule { }
