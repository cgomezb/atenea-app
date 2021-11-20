import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { userAvatars } from '@features/user';

@Component({
  selector: 'app-create-user-dialog',
  templateUrl: './create-user-dialog.component.html',
  styleUrls: ['./create-user-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class CreateUserDialogComponent implements OnInit {
  public form: FormGroup;
  public avatars = userAvatars

  constructor(public dialogRef: MatDialogRef<CreateUserDialogComponent>) {}

  ngOnInit(): void {
    const [defaultAvatar] = this.avatars;

    this.form = new FormGroup({
      avatar: new FormControl(defaultAvatar.value),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
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
