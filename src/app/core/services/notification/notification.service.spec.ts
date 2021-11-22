import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificationService } from '@core/services';

describe('NotificationService', () => {
  let service: NotificationService;
  let snackBar: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: MatSnackBar, useValue: { open: jest.fn() }}
      ]
    });

    service = TestBed.inject(NotificationService);
    snackBar = TestBed.inject(MatSnackBar);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should show message', () => {
    const message = 'This is a message';
    service.showMessage(message);

    expect(snackBar.open).toHaveBeenCalledWith(
      'This is a message',
      '',
      { duration: 3000 }
    );
  });
});
