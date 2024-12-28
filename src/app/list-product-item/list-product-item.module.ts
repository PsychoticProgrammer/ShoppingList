import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductItemComponent } from './list-product-item.component';
import { IonicModule } from '@ionic/angular';
import { ListProductModalModule } from '../list-product-modal/list-product-modal.module';
import { ConfirmDeleteModalModule } from '../confirm-delete-modal/confirm-delete-modal.module';
import { FormsModule } from '@angular/forms';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { TypePipeModule } from '../pipes/type-pipe.module';


@NgModule({
  declarations: [
    ListProductItemComponent,
  ],
  imports: [
    CommonModule,
    IonicModule,
    ListProductModalModule,
    ConfirmDeleteModalModule,
    FormsModule,
    ImageViewerModule,
    TypePipeModule
  ],
  exports: [
    ListProductItemComponent
  ]
})
export class ListProductItemModule { }
