import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { LearningDialogComponent } from './learning-dialog.component';

describe('LearningDialogComponent', () => {
  let component: LearningDialogComponent;
  let fixture: ComponentFixture<LearningDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LearningDialogComponent ],
      imports: [ MatDialogModule ],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: { learnings: [] }}
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
