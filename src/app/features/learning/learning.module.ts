import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SharedModule } from "@shared/shared.module";
import { LearningRoutingModule } from "./learning-routing.module";
import { LearningComponent } from ".";

@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [
    LearningRoutingModule,
    CommonModule,
    SharedModule
  ]
})

export class LearningModule {}
