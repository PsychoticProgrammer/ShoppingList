import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductComponent } from './product.component';
import { ProductItemModule } from '../product-item/product-item.module';
import { IonicModule } from '@ionic/angular';
import { NavigationTabModule } from '../navigation-tab/navigation-tab.module';
import { ProductRoutingModule } from './product-routing.module';
import { AddButtonModule } from '../add-button/add-button.module';
import { EmptyDataModule } from '../empty-data/empty-data.module';



@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ProductItemModule,
    NavigationTabModule,
    ProductRoutingModule,
    AddButtonModule,
    EmptyDataModule
  ]
})
export class ProductModule { }
