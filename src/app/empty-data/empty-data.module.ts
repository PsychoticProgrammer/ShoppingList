import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmptyDataComponent } from './empty-data.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    EmptyDataComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    EmptyDataComponent
  ]
})
export class EmptyDataModule { }
