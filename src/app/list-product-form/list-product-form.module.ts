import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListProductFormRoutingModule } from './list-product-form-routing.module';
import { ListProductFormComponent } from './list-product-form.component';
import { IonicModule } from '@ionic/angular';
import { ListProductItemModule } from '../list-product-item/list-product-item.module';
import { FormSearchBarModule } from '../form-search-bar/form-search-bar.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';


@NgModule({
  declarations: [
    ListProductFormComponent
  ],
  imports: [
    CommonModule,
    ListProductFormRoutingModule,
    IonicModule,
    ListProductItemModule,
    FormSearchBarModule,
    BackButtonModule,
    EmptyDataModule
  ]
})
export class ListProductFormModule { }
