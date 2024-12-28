import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MealIngredientItemComponent } from './meal-ingredient-item.component';
import { IonicModule } from '@ionic/angular';
import { ListProductModalModule } from '../list-product-modal/list-product-modal.module';
import { ConfirmDeleteModalModule } from '../confirm-delete-modal/confirm-delete-modal.module';
import { FormsModule } from '@angular/forms';
import { ImageViewerModule } from '../image-viewer/image-viewer.module';



@NgModule({
  declarations: [
    MealIngredientItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    ListProductModalModule,
    ConfirmDeleteModalModule,
    FormsModule,
    ImageViewerModule
  ],
  exports: [
    MealIngredientItemComponent
  ]
})
export class MealIngredientItemModule { }
