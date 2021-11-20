import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, SearchControlComponent } from '.';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent,
    ConfirmDialogComponent
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
    ConfirmDialogComponent,
    // External
    MatDialogModule
  ]
})

export class SharedModule {}
