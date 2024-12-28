import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListFormRoutingModule } from './list-form-routing.module';
import { ListFormComponent } from './list-form.component';
import { IonicModule } from '@ionic/angular';
import { ListProductItemModule } from '../list-product-item/list-product-item.module';
import { FormsModule } from '@angular/forms';
import { FormSearchBarModule } from '../form-search-bar/form-search-bar.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';


@NgModule({
  declarations: [
    ListFormComponent
  ],
  imports: [
    CommonModule,
    ListFormRoutingModule,
    IonicModule,
    ListProductItemModule,
    FormsModule,
    FormSearchBarModule,
    BackButtonModule,
    EmptyDataModule
  ]
})
export class ListFormModule { }
