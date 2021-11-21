import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-learning-dialog',
  templateUrl: './create-learning-dialog.component.html',
  styleUrls: ['./create-learning-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateLearningDialogComponent implements OnInit {
  public form: FormGroup;

  constructor(public dialogRef: MatDialogRef<CreateLearningDialogComponent>) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl('unarchive'),
    });
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
