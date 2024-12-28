import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealItemComponent } from './meal-item.component';
import { IonicModule } from '@ionic/angular';
import { ConfirmDeleteModalModule } from '../confirm-delete-modal/confirm-delete-modal.module';
import { FormsModule } from '@angular/forms';
import { TypePipeModule } from '../pipes/type-pipe.module';



@NgModule({
  declarations: [
    MealItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ConfirmDeleteModalModule,
    FormsModule,
    TypePipeModule
  ],
  exports: [
    MealItemComponent
  ]
})
export class MealItemModule { }
