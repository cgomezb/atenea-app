import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserService } from '@core/services';
import { UserQuery } from '@features/user/store/user.query';
import { MatDialog } from "@angular/material/dialog";
import { UserComponent } from './user.component';
import { of } from 'rxjs';

describe('UserComponent', () => {
  let component: UserComponent;
  let dialog: MatDialog;
  let fixture: ComponentFixture<UserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserComponent],
      providers: [
        { provide: UserService, useValue: { }, },
        { provide: UserQuery, useValue: { loading$: of(true), getValue: jest.fn() } },
        { provide: MatDialog, useValue: { open: jest.fn(), afterClosed: of([]) }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserComponent);
    component = fixture.componentInstance;
    dialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
