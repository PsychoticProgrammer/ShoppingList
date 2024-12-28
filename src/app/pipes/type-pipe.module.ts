import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TypePipePipe } from './type-pipe.pipe';



@NgModule({
  declarations: [
    TypePipePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    TypePipePipe
  ]
})
export class TypePipeModule { }
