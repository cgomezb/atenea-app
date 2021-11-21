import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@core/core.model';

@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AssignUsersDialogComponent implements OnInit {
  public form: FormGroup;
  public userList: User[];

  constructor(public dialogRef: MatDialogRef<AssignUsersDialogComponent>) {}

  ngOnInit(): void {
    this.userList = [];
    this.form = new FormGroup({
      users: new FormControl(null)
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }

}
