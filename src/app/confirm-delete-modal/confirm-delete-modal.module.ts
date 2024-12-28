import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteModalComponent } from './confirm-delete-modal.component';
import { IonicModule } from '@ionic/angular';



@NgModule({
  declarations: [
    ConfirmDeleteModalComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ConfirmDeleteModalComponent
  ]
})
export class ConfirmDeleteModalModule { }
