import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { userAvatars } from '@features/user/user.utils';

import { CreateUserDialogComponent } from './create-user-dialog.component';

describe('CreateUserDialogComponent', () => {
  let component: CreateUserDialogComponent;
  let fixture: ComponentFixture<CreateUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateUserDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn() }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateUserDialogComponent);
    component = fixture.componentInstance;
    component.avatars = userAvatars;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      avatar: 1,
      name: null,
      email: null
    });
  });

  describe('save form', () => {
    it('should not close the dialog', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: '',
        email: 'jsmith@email.com'
      });

      component.save();
      
      expect(component.dialogRef.close).not.toHaveBeenCalled();
    });

    it('should close the dialog with the form value', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: 'John Smith',
        email: 'jsmith@email.com'
      });

      component.save();
      
      expect(component.dialogRef.close).toHaveBeenNthCalledWith(1, {
        avatar: 1,
        name: 'John Smith',
        email: 'jsmith@email.com'
      });
    });
  })

  it('should close the dialog', () => {
    component.close();

    expect(component.dialogRef.close).toHaveBeenNthCalledWith(1);
  });
});
