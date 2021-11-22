import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserInfo, UserLearningInfoResponse } from '@core/core.model';
import { BackEndService } from '@core/services/backend.service';

export interface AssignUsersDialogData {
  learningId: string;
}

@Component({
  selector: 'app-assign-users-dialog',
  templateUrl: './assign-users-dialog.component.html',
  styleUrls: ['./assign-users-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class AssignUsersDialogComponent implements OnInit {
  public form: FormGroup;
  public userInfo: UserInfo[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: AssignUsersDialogData,
    public dialogRef: MatDialogRef<AssignUsersDialogComponent>,
    public userLearningClient: BackEndService
  ) {}

  ngOnInit(): void {
    const learningId = this.dialogData.learningId;

    this.form = new FormGroup({
      users: new FormControl([])
    });

    this.userLearningClient.getUserLearningInfo(learningId)
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
