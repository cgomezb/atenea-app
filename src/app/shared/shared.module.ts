import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, SearchControlComponent } from '.';

@NgModule({
  declarations: [LoaderComponent, SearchControlComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,
    LoaderComponent,
    SearchControlComponent
  ]
})

export class SharedModule {}
