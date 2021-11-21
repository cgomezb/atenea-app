import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { Page, User } from '@core/core.model';
import { userHeaders } from '@features/user';
import { CreateUserDialogComponent } from '@features/user/create-user-dialog/create-user-dialog.component';
import { createUserDialogConfig, defaultPagination } from '@features/user/user.utils';
import { filter, takeUntil } from 'rxjs/operators';

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
    this.userService.setParameters({ page: defaultPagination });
  }

  onSearchChanged(query: string): void {
    this.userService.setParameters({ query, page: defaultPagination });
  }

  onUserCreated(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, createUserDialogConfig);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(user => Boolean(user))
      )
      .subscribe((user: User) => this.createUser(user));
  }

  onLearningDialogOpened({ learnings }: User) {
    console.log(learnings);
  }

  onUserDeleted({ id }: User): void {
    console.log(id);
  }

  onPageChanged(page: Page): void {
    this.userService.setParameters({ query: this.userQuery.currentQuery(), page });
  }

  private createUser(user: User): void {  
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => {
          console.log('Created');
        },
        (err: string) => console.log(`Error deleting user: ${err}`)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
