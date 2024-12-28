import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductItemComponent } from './product-item.component';
import { IonicModule } from '@ionic/angular';
import { ConfirmDeleteModalModule } from '../confirm-delete-modal/confirm-delete-modal.module';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';
import { BackButtonModule } from '../back-button/back-button.module';


@NgModule({
  declarations: [
    ProductItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ConfirmDeleteModalModule,
    ImageViewerModule,
    BackButtonModule,
  ],
  exports: [
    ProductItemComponent
  ]
})
export class ProductItemModule { }
