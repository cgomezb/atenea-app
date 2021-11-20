import { Component, ChangeDetectionStrategy, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { Subject } from 'rxjs';

@Component({
  selector: 'atenea-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class UserComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<string>();

  constructor(
    public userService: UserService,
    public userQuery: UserQuery,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
