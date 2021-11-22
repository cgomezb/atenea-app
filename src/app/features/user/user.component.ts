import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { NotificationService, UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';
import { Page, User } from '@core/core.model';
import {
  userHeaders,
  CreateUserDialogComponent,
  LearningDialogComponent
} from '@features/user';
import {
  userDialogConfig,
  defaultPagination,
  userConfirmDialogConfig
} from '@features/user/user.utils';
import { filter, takeUntil } from 'rxjs/operators';
import { ConfirmDialogComponent } from '@shared/index';

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
    public dialog: MatDialog,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.userService.setParameters({ page: defaultPagination });
  }

  onSearchChanged(query: string): void {
    this.userService.setParameters({ query, page: defaultPagination });
  }

  onUserCreated(): void {
    const dialogRef = this.dialog.open(CreateUserDialogComponent, userDialogConfig);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(user => Boolean(user))
      )
      .subscribe((user: User) => this.createUser(user));
  }

  onLearningDialogOpened({ learnings }: User) {
    if (!learnings?.length) {
      return;
    }

    this.dialog.open(LearningDialogComponent, { ...userDialogConfig, data: { learnings } });
  }

  onUserDeleted({ id }: User): void {
    if (!id) { return; }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, userConfirmDialogConfig);
    
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(toDelete => Boolean(toDelete))
      )
      .subscribe(() => this.deleteUser(id));
  }

  onPageChanged(page: Page): void {
    this.userService.setParameters({ query: this.userQuery.currentQuery(), page });
  }

  private createUser(user: User): void {  
    this.userService.createUser(user)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('User created'),
        (err: string) => this.notificationService.showMessage(`Error creating user: ${err}`)
      );
  }

  private deleteUser(id: string): void {
    if (!id) { return; }
  
    this.userService.deleteUser(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('User deleted'),
        (err) => this.notificationService.showMessage(`Error deleting user: ${err}`)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
