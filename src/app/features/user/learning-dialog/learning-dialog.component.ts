import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface LearningDialogData {
  learnings: string[]
}

@Component({
  selector: 'app-learning-dialog',
  templateUrl: './learning-dialog.component.html',
  styleUrls: ['./learning-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LearningDialogComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: LearningDialogData) { }
}
