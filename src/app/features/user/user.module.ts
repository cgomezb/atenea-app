import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";

import { UserComponent, CreateUserDialogComponent } from '.';

@NgModule({
  declarations: [
    UserComponent,
    CreateUserDialogComponent
  ],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})

export class UserModule {}
