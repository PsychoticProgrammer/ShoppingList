import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { IonicModule } from '@ionic/angular';
import { BackButtonModule } from '../back-button/back-button.module';



@NgModule({
  declarations: [
    ImageViewerComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    BackButtonModule
  ],
  exports: [
    ImageViewerComponent,
    BackButtonModule
  ]
})
export class ImageViewerModule { }
