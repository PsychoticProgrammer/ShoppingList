import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormSearchBarComponent } from './form-search-bar.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    FormSearchBarComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    FormSearchBarComponent,
  ]
})
export class FormSearchBarModule { }
