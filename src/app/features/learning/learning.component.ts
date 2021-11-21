import { Component, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Learning, LearningStatus, Page } from '@core/core.model';
import { LearningService } from '@core/services';
import { CreateLearningDialogComponent, defaultPagination, learningDialogConfig, learningHeaders } from '@features/learning';
import { LearningQuery } from '@features/learning/store/learning.query';
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
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.learningService.setParameters({ page: defaultPagination });
  }

  onSearchChanged(query: string): void {
    console.log(query);
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
    console.log('onUserDeleted');
  }

  onPageChanged(page: Page): void {
    console.log('onPageChanged');
  }

  onStatusChanged({ id, status }: Learning) {
    console.log('onStatusChanged');
  }

  isArchiveStatus(status: LearningStatus) {
    return [
      LearningStatus.archive
    ].includes(status);
  }

  onUserAssigned(): void {
    console.log('onUserAssigned');
  }

  private createLearning(learning: Learning) {
    console.log(learning);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
