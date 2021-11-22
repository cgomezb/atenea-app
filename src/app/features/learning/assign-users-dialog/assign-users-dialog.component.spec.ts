import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserLearningInfoResponse } from '@core/core.model';
import { BackEndService } from '@core/services';
import { of } from 'rxjs';

import { AssignUsersDialogComponent } from './assign-users-dialog.component';

describe('AssignUsersDialogComponent', () => {
  let component: AssignUsersDialogComponent;

  let fixture: ComponentFixture<AssignUsersDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AssignUsersDialogComponent ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { learningId: '' }},
        { provide: MatDialogRef, useValue: { close: jest.fn() }},
        {
          provide: BackEndService,
          useValue: {
            getUserLearningInfo: () => of({})
          }}
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignUsersDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form', () => {
    const userLearning: UserLearningInfoResponse = {
      usersInfo: [
        {
          id: '6fde2e29-ca45-4024-8ee2-f477344a2743',
          name: 'John Smith'
        }
      ],
      usersAssigned: ['6fde2e29-ca45-4024-8ee2-f477344a2743']
    }

    component.dialogData.learningId = '49a45829-d17b-4494-8f19-5f3ebca07e7a';
    component.userLearningClient.getUserLearningInfo = jest.fn().mockReturnValue(of(userLearning))

    component.ngOnInit();

    expect(component.userInfo).toEqual([
      {
        id: '6fde2e29-ca45-4024-8ee2-f477344a2743',
        name: 'John Smith'
      }
    ]);
    expect(component.form.value).toEqual({
      users: ['6fde2e29-ca45-4024-8ee2-f477344a2743']
    });
  });

  it('should close the dialog with the form value', () => {
    component.ngOnInit();
    component.form.patchValue({
      users: ['84283842-4072-4ec4-8544-3a61ee326655']
    });

    component.save();
    
    expect(component.dialogRef.close).toHaveBeenNthCalledWith(
      1,
      ['84283842-4072-4ec4-8544-3a61ee326655']
    );
  });


  it('should close the dialog', () => {
    component.close();

    expect(component.dialogRef.close).toHaveBeenNthCalledWith(1);
  });
});
