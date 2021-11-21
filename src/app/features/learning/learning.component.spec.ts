import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { Page } from '@core/core.model';
import { LearningService } from '@core/services';
import { defaultPagination } from '@features/learning';
import { LearningQuery } from '@features/learning/store/learning.query';
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
});
