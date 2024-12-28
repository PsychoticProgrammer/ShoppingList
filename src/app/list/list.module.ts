import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list.component';

import { ListRoutingModule } from './list-routing.module';
import { ListItemModule } from '../list-item/list-item.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ListRoutingModule,
    ListItemModule,
    AddButtonModule,
    EmptyDataModule
  ]
})
export class ListModule { }
