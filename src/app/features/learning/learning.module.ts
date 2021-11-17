import { NgModule } from "@angular/core";
import { LearningRoutingModule } from "./learning-routing.module";
import { LearningComponent } from ".";

@NgModule({
  declarations: [
    LearningComponent
  ],
  imports: [LearningRoutingModule]
})

export class LearningModule {}
