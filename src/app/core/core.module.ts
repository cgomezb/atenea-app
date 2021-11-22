import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { MainLayoutComponent } from '.';

@NgModule({
  declarations: [MainLayoutComponent],
  imports: [
    BrowserModule,
    RouterModule,
    MatSnackBarModule
  ],
  exports: [MainLayoutComponent]
})

export class CoreModule {}
