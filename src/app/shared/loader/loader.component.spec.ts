import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoaderComponent } from './loader.component';
import { By } from '@angular/platform-browser';
import { ChangeDetectionStrategy } from '@angular/core';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoaderComponent ]
    })
    .overrideComponent(LoaderComponent, { set: { changeDetection: ChangeDetectionStrategy.Default } })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  test('should display the loader based on show attribute', () => {
    component.show = true;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loader'))).toBeTruthy();

    component.show = false;
    fixture.detectChanges();
    expect(fixture.debugElement.query(By.css('.loader'))).toBeFalsy();
  });
});
