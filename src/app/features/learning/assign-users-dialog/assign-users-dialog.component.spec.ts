import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
});
