import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductModalComponent } from './list-product-modal.component';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListProductModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule
  ],
  exports: [
    ListProductModalComponent
  ]
})
export class ListProductModalModule { }
