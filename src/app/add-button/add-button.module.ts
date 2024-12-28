import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddButtonComponent } from './add-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    AddButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    AddButtonComponent
  ]
})
export class AddButtonModule { }
