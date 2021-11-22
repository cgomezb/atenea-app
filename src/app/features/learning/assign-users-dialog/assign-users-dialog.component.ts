import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UserInfo, UserLearningInfoResponse } from '@core/core.model';
import { BackEndService } from '@core/services/backend.service';

@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssignUsersDialogComponent implements OnInit {
  public form: FormGroup;
  public userInfo: UserInfo[];

  constructor(
    public dialogRef: MatDialogRef<AssignUsersDialogComponent>,
    public userLearning: BackEndService
  ) {}

  ngOnInit(): void {
    const learningId = '9d4fa871-93e8-4c3d-86cc-88b00c5eb035';

    this.form = new FormGroup({
      users: new FormControl([])
    });

    this.userLearning.getUserLearningInfo(learningId)
      .subscribe((userLearning: UserLearningInfoResponse) => this.setInternalValues(userLearning));
  }

  setInternalValues({ usersInfo, usersAssigned }: UserLearningInfoResponse): void {
    this.userInfo = usersInfo;
    this.form.setValue({ users: usersAssigned });
  }

  save() {
    this.dialogRef.close(this.form.value.users);
  }

  close() {
    this.dialogRef.close();
  }

}
