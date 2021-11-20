import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoaderComponent, SearchControlComponent } from '.';
import { MatDialogModule } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { TableComponent } from './table/table.component';
import { PaginationComponent } from './pagination/pagination.component';
import { NoResultsComponent } from '@shared/no-results/no-results.component';

@NgModule({
  declarations: [
    LoaderComponent,
    SearchControlComponent,
    ConfirmDialogComponent,
    TableComponent,
    PaginationComponent,
    NoResultsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule
  ],
  exports: [
    CommonModule,

    // Internal
    TableComponent,
    LoaderComponent,
    SearchControlComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    NoResultsComponent,
    // External
    MatDialogModule
  ]
})

export class SharedModule {}
