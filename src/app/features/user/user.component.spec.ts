import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { Page } from '@core/core.model';
import { defaultPagination } from '@features/user/user.utils';

describe('UserComponent', () => {
  let component: UserComponent;
  let userService: UserService;
  let userQuery: UserQuery;
  let dialog: MatDialog;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        {
          provide: UserService,
          useValue: {
            setParameters: jest.fn(),
            createUser: jest.fn()
          },
        },
        {
          provide: UserQuery,
          useValue: {
            users$: of(),
            totalCount$: of(),
            query$: of(),
            page$: of(),
            loading$: of(true),
            paging$: of(),
            currentQuery: jest.fn(),
            getValue: jest.fn()
          }
        },
        { provide: MatDialog, useValue: { open: jest.fn(), afterClosed: of([]) }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UserService);
    userQuery = TestBed.inject(UserQuery);
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set initial paramaters on init', () => {
    const page: Page = defaultPagination;

    component.ngOnInit();

    expect(userService.setParameters).toHaveBeenCalledWith({ page });
  });

  it('should set paramaters on search changed', () => {
    const query = '';
    const page: Page = defaultPagination;

    component.onSearchChanged(query);

    expect(userService.setParameters).toHaveBeenCalledWith({ query, page });
  });

  it('should set paramaters on page changed', () => {
    userQuery.currentQuery = jest.fn().mockReturnValue('smith');
    const page: Page = { page: 3, count: 10, offset: 20 };

    component.onPageChanged(page);

    expect(userService.setParameters).toHaveBeenCalledWith({
      query: 'smith',
      page: { page: 3, count: 10, offset: 20 }
    });
  });

  it('should emit a value on the destroy$ subject to end the active subscriptions', () => {
    component.destroy$.next = jest.fn();
    component.destroy$.complete = jest.fn();

    component.ngOnDestroy();

    expect(component.destroy$.next).toHaveBeenCalledTimes(1);
    expect(component.destroy$.complete).toHaveBeenCalledTimes(1);
  });
});
