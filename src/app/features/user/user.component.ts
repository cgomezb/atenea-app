import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { Page, User } from '@core/core.model';
import { userHeaders } from '@features/user';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<string>();
  headers: string[] = userHeaders;

  constructor(
    public userService: UserService,
    public userQuery: UserQuery,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  onSearchChanged(query: string): void {
    console.log(query);
  }

  onUserCreated(): void {
    console.log('User created');
  }

  onLearningDialogOpened({ learnings }: User) {
    console.log(learnings);
  }

  onUserDeleted({ id }: User): void {
    console.log(id);
  }

  onPageChanged(page: Page): void {
    console.log(page);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
