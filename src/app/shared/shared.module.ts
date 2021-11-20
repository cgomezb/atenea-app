import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {
  LoaderComponent,
  SearchControlComponent,
  ConfirmDialogComponent,
  TableComponent,
  PaginationComponent,
  NoResultsComponent
} from '.';

import { MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';


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
    ReactiveFormsModule,
    // Internal
    TableComponent,
    LoaderComponent,
    SearchControlComponent,
    ConfirmDialogComponent,
    PaginationComponent,
    NoResultsComponent,
    // External
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule
  ]
})

export class SharedModule {}
