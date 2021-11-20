import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, SearchControlComponent } from '.';
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    CommonModule,

    // Internal
    LoaderComponent,
    SearchControlComponent,
    // External
    MatDialogModule
  ]
})

export class SharedModule {}
