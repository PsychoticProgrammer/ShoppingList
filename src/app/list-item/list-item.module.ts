import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListItemComponent } from './list-item.component';
import { IonicModule } from '@ionic/angular';
import { ConfirmDeleteModalModule } from '../confirm-delete-modal/confirm-delete-modal.module';
import { FormsModule } from '@angular/forms';
import { TypePipeModule } from '../pipes/type-pipe.module';



@NgModule({
  declarations: [
    ListItemComponent,
    // TypePipePipe
  ],
  imports: [
    CommonModule,
    IonicModule,
    ConfirmDeleteModalModule,
    FormsModule,
    TypePipeModule
  ],
  exports: [
    ListItemComponent,
  ]
})
export class ListItemModule { }
