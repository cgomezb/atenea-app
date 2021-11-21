import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { UserComponent } from './user.component';
import { of } from 'rxjs';
import { Page, User } from '@core/core.model';
import { defaultPagination, userConfirmDialogConfig, userDialogConfig } from '@features/user/user.utils';
import { CreateUserDialogComponent, LearningDialogComponent } from '@features/user';
import { ConfirmDialogComponent } from '@shared/index';

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
            createUser: jest.fn(),
            deleteUser: jest.fn()
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
        { provide: MatDialog, useValue: { open: jest.fn() }}
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

  describe('open the create user dialog', () => {
    it('should call create user', () => {
      const user: User = { avatar: '1', name: 'John Smith', email: 'jsmith' };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(user) });
  
      component.onUserCreated();
  
      expect(dialog.open).toHaveBeenCalledWith(CreateUserDialogComponent, userDialogConfig);
      expect(userService.createUser).toHaveBeenCalledWith({
        avatar: '1', name: 'John Smith', email: 'jsmith'
      });
    });

    it('should not call create user', () => {
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(false) });
  
      component.onUserCreated();
  
      expect(dialog.open).toHaveBeenCalledWith(CreateUserDialogComponent, userDialogConfig);
      expect(userService.createUser).not.toHaveBeenCalled();
    });
  });
  
  describe('open the confirm dialog on delete user', () => {
    it('should call delete user', () => {
      const user: User = { id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b', avatar: '1', name: 'John Smith', email: 'jsmith' };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(true) });
  
      component.onUserDeleted(user);
  
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, userConfirmDialogConfig);
      expect(userService.deleteUser).toHaveBeenCalledWith('6b5032fd-fbe9-404c-99a0-20501a7ebd0b');
    });

    it('should not call delete user', () => {
      const user: User = { id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b', avatar: '1', name: 'John Smith', email: 'jsmith' };
      dialog.open = jest.fn().mockReturnValue({ afterClosed: () => of(false) });
  
      component.onUserDeleted(user);
  
      expect(dialog.open).toHaveBeenCalledWith(ConfirmDialogComponent, userConfirmDialogConfig);
      expect(userService.deleteUser).not.toHaveBeenCalled();
    });
  });

  describe('learning dialog', () => {
    it('should open the dialog', () => {
      const user: User = {
        id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b',
        avatar: '1',
        name: 'John Smith',
        email: 'jsmith',
        learnings: ['JavaScript']
      };
      const { learnings } = user;
  
      component.onLearningDialogOpened(user);
  
      expect(dialog.open).toHaveBeenCalledWith(
        LearningDialogComponent,
        { ...userDialogConfig, data: { learnings } }
      );
    });

    it('should not open the dialog', () => {
      const user: User = {
        id: '6b5032fd-fbe9-404c-99a0-20501a7ebd0b',
        avatar: '1',
        name: 'John Smith',
        email: 'jsmith'
      };
  
      component.onLearningDialogOpened(user);
  
      expect(dialog.open).not.toHaveBeenCalled();
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
