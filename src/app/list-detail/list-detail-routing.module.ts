import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListDetailComponent } from './list-detail.component';

const routes: Routes = [
  {
    path: '',
    component: ListDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListDetailRoutingModule { }
