import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';

import { CreateLearningDialogComponent } from './create-learning-dialog.component';

describe('CreateLearningDialogComponent', () => {
  let component: CreateLearningDialogComponent;
  let fixture: ComponentFixture<CreateLearningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLearningDialogComponent ],
      providers: [
        { provide: MatDialogRef, useValue: { close: jest.fn() }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    component.ngOnInit();

    expect(component.form.value).toEqual({
      name: null,
      status: 'unarchive'
    });
  });

  describe('save form', () => {
    it('should not close the dialog', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: '',
        status: 'unarchive'
      });

      component.save();
      
      expect(component.dialogRef.close).not.toHaveBeenCalled();
    });

    it('should close the dialog with the form value', () => {
      component.ngOnInit();
      component.form.patchValue({
        name: 'Javascript',
        status: 'unarchive'
      });

      component.save();
      
      expect(component.dialogRef.close).toHaveBeenNthCalledWith(1, {
        name: 'Javascript',
        status: 'unarchive'
      });
    });
  })

  it('should close the dialog', () => {
    component.close();

    expect(component.dialogRef.close).toHaveBeenNthCalledWith(1);
  });
});
