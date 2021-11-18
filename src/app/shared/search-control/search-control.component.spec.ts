import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { SearchControlComponent } from './search-control.component';

describe('SearchControlComponent', () => {
  let component: SearchControlComponent;
  let fixture: ComponentFixture<SearchControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchControlComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('onSearch', () => {
    it('should not emit if the query is empty', () => {
      component.search.emit = jest.fn();
      component.query = '  ';
      component.onSearch();

      expect(component.search.emit).not.toHaveBeenCalled();
    });

    it('should emit the query value if it is not empty', () => {
      component.search.emit = jest.fn();
      component.query = 'query';
      component.onSearch();

      expect(component.search.emit).toHaveBeenCalledWith('query');
    });
  });

  it('should emit empty when input is cleared', () => {
    component.search.emit = jest.fn();
    component.onClear();

    expect(component.query).toBe('');
    expect(component.search.emit).toHaveBeenCalledWith('');
  });
});
