import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { NavigationTabComponent } from './navigation-tab.component';



@NgModule({
  declarations: [
    NavigationTabComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    NavigationTabComponent
  ]
})
export class NavigationTabModule { }
