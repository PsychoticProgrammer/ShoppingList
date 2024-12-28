import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ListDetailRoutingModule } from './list-detail-routing.module';
import { ListDetailComponent } from './list-detail.component';
import { IonicModule } from '@ionic/angular';
import { ListProductItemModule } from '../list-product-item/list-product-item.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { BackButtonModule } from '../back-button/back-button.module';
import { TypePipeModule } from '../pipes/type-pipe.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';


@NgModule({
  declarations: [
    ListDetailComponent,
  ],
  imports: [
    CommonModule,
    ListDetailRoutingModule,
    IonicModule,
    ListProductItemModule,
    AddButtonModule,
    BackButtonModule,
    TypePipeModule,
    EmptyDataModule
  ]
})
export class ListDetailModule { }
