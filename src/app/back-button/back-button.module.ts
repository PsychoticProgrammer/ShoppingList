import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackButtonComponent } from './back-button.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    BackButtonComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    BackButtonComponent
  ]
})
export class BackButtonModule { }
