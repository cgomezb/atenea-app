import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Learning, LearningStatus, Page } from '@core/core.model';
import { LearningService } from '@core/services';
import { CreateLearningDialogComponent, defaultPagination, learningConfirmDialogConfig, learningDialogConfig } from '@features/learning';
import { LearningQuery } from '@features/learning/store/learning.query';
import { ConfirmDialogComponent } from '@shared/index';
import { of } from 'rxjs';

import { LearningComponent } from './learning.component';

describe('LearningComponent', () => {
  let component: LearningComponent;
  let learningService: LearningService;
  let learningQuery: LearningQuery;
  let dialog: MatDialog;
  let fixture: ComponentFixture<LearningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningComponent ],
      providers: [
        {
          provide: LearningService,
          useValue: {
            setParameters: jest.fn(),
            createLearning: jest.fn(),
            deleteLearning: jest.fn()
          },
        },
        {
          provide: LearningQuery,
          useValue: {
            learnings$: of(),
            totalCount$: of(),
            query$: of(),
            page$: of(),
            loading$: of(true),
            paging$: of(),
            currentQuery: jest.fn(),
            getValue: jest.fn()
          }
        },
        { provide: MatDialog, useValue: { open: jest.fn() }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningComponent);
    component = fixture.componentInstance;
    learningService = TestBed.inject(LearningService);
    learningQuery = TestBed.inject(LearningQuery);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial paramaters on init', () => {
    const page: Page = defaultPagination;

    component.ngOnInit();

    expect(learningService.setParameters).toHaveBeenCalledWith({ page });
  });

  it('should set paramaters on search changed', () => {
    const query = '';
    const page: Page = defaultPagination;

    component.onSearchChanged(query);

    expect(learningService.setParameters).toHaveBeenCalledWith({ query, page });
  });

  it('should set paramaters on page changed', () => {
    learningQuery.currentQuery = jest.fn().mockReturnValue('Java');
    const page: Page = { page: 3, count: 10, offset: 20 };

    component.onPageChanged(page);

    expect(learningService.setParameters).toHaveBeenCalledWith({
      query: 'Java',
      page: { page: 3, count: 10, offset: 20 }
    });
  });

  describe('open the create learning dialog', () => {
    it('should call create learning', () => {
      const learning: Learning = { name: 'Javascript', status: LearningStatus.unarchive };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(learning) });
  
      component.onLearningCreated();
  
      expect(dialog.open).toHaveBeenCalledWith(CreateLearningDialogComponent, learningDialogConfig);
      expect(learningService.createLearning).toHaveBeenCalledWith({
        name: 'Javascript', status: LearningStatus.unarchive
      });
    });

    it('should not call create learning', () => {
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(false) });
  
      component.onLearningCreated();
  
      expect(dialog.open).toHaveBeenCalledWith(CreateLearningDialogComponent, learningDialogConfig);
      expect(learningService.createLearning).not.toHaveBeenCalled();
    });
  });
  
  describe('open the confirm dialog on delete learning', () => {
    it('should call delete learning', () => {
      const learning: Learning = { id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b', name: 'Javascript', status: LearningStatus.unarchive };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(true) });
  
      component.onLearningDeleted(learning);
  
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, learningConfirmDialogConfig);
      expect(learningService.deleteLearning).toHaveBeenCalledWith('6b5032fd-fbe9-404c-99a0-20501a7ebd0b');
    });

    it('should not call delete learning', () => {
      const learning: Learning = { id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b', name: 'Javascript', status: LearningStatus.unarchive };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(false) });
  
      component.onLearningDeleted(learning);
  
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, learningConfirmDialogConfig);
      expect(learningService.deleteLearning).not.toHaveBeenCalled();
    });
  });
});
