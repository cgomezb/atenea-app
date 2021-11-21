import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";

import { UserComponent, CreateUserDialogComponent } from '.';
import { LearningDialogComponent } from './learning-dialog/learning-dialog.component';

@NgModule({
  declarations: [
    UserComponent,
    CreateUserDialogComponent,
    LearningDialogComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})

export class UserModule {}
