import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductFormRoutingModule } from './product-form-routing.module';
import { ProductFormComponent } from './product-form.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { BackButtonModule } from '../back-button/back-button.module';


@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
    CommonModule,
    ProductFormRoutingModule,
    IonicModule,
    FormsModule,
    BackButtonModule
  ]
})
export class ProductFormModule { }
