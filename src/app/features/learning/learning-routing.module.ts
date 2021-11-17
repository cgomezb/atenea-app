import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LearningComponent } from ".";

const routes: Routes = [
  { path: '', component: LearningComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class LearningRoutingModule {}
