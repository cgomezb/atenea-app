import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Learning, LearningStatus, Page } from '@core/core.model';
import { LearningService, NotificationService } from '@core/services';
import {
  CreateLearningDialogComponent,
  AssignUsersDialogComponent,
  defaultPagination,
  learningConfirmDialogConfig,
  learningDialogConfig,
  learningHeaders,
  userLearningAssignDialogConfig
} from '@features/learning';
import { LearningQuery } from '@features/learning/store/learning.query';
import { ConfirmDialogComponent } from '@shared/index';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-learning',
  templateUrl: './learning.component.html',
  styleUrls: ['./learning.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class LearningComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<string>();
  headers: string[] = learningHeaders;

  constructor(
    public learningService: LearningService,
    public learningQuery: LearningQuery,
    public dialog: MatDialog,
    public notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.learningService.setParameters({ page: defaultPagination });
  }

  onSearchChanged(query: string): void {
    this.learningService.setParameters({ query, page: defaultPagination });
  }

  onLearningCreated(): void {
    const dialogRef = this.dialog.open(CreateLearningDialogComponent, learningDialogConfig);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(learning => Boolean(learning))
      )
      .subscribe((learning: Learning) => this.createLearning(learning));
  }

  onLearningDeleted({ id }: Learning): void {
    if (!id) { return; }

    const dialogRef = this.dialog.open(ConfirmDialogComponent, learningConfirmDialogConfig);
    
    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(toDelete => Boolean(toDelete))
      )
      .subscribe(() => this.deleteLearning(id));
  }

  onPageChanged(page: Page): void {
    this.learningService.setParameters({ query: this.learningQuery.currentQuery(), page });
  }

  onStatusChanged({ id }: Learning) {
    if (!id) { return; }

    this.learningService.updateLearningStatus(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('Status updated'),
        (err: string) => this.notificationService.showMessage(`Error updating learning status: ${err}`)
      );
  }

  isArchiveStatus(status: LearningStatus) {
    return [
      LearningStatus.archive
    ].includes(status);
  }

  onUserAssigned({ id }: Learning): void {
    if (!id) { return; }

    const dialogRef = this.dialog.open(
      AssignUsersDialogComponent,
      { ...userLearningAssignDialogConfig, data: { learningId: id }
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(assignUsers => Boolean(assignUsers))
      )
      .subscribe((assignUsers: string[]) => this.assignUsers(id, assignUsers));
  }

  private createLearning(learning: Learning): void {
    this.learningService.createLearning(learning)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('Learning created'),
        (err: string) => this.notificationService.showMessage(`Error creating learning: ${err}`)
      );
  }

  private deleteLearning(id: string): void {
    if (!id) { return; }
  
    this.learningService.deleteLearning(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('Learning deleted'),
        (err) => this.notificationService.showMessage(`Error deleting learning: ${err}`)
      );
  }

  private assignUsers(id: string, assignUsers: string[]): void {
    this.learningService.assignUsers(id, assignUsers)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        () => this.notificationService.showMessage('Users Assigned'),
        (err) => this.notificationService.showMessage(`Error assigning users: ${err}`)
      );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
