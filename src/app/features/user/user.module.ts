import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { UserRoutingModule } from "./user-routing.module";

import { UserComponent } from '.';

@NgModule({
  declarations: [UserComponent],
  imports: [
    UserRoutingModule,
    CommonModule,
    SharedModule
  ]
})

export class UserModule {}
