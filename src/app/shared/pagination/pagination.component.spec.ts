import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavOption } from '@shared/pagination/pagination-model';

import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaginationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('initialize options', () => {
    it('should set pageOption paramaters recieved', () => {
      const pageOption = { text: '50', value: 50 };
      component.pageOption = pageOption;
      expect(component.pageSize).toBe(50);
      expect(component.currentPageOption).toEqual({ text: '50', value: 50 });
    });

    it('should set paging default paramaters', () => {
      component.paging = null;
      expect(component.totalRecords).toBe(0);
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(1);
    });

    it('should set paging paramaters recieved', () => {
      component.paging = { totalCount: 10, currentPage: 1 };
      expect(component.totalRecords).toBe(10);
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(1);
    });

    it('should set paging paramaters without results', () => {
      component.paging = { totalCount: 0, currentPage: 1 };
      expect(component.totalRecords).toBe(0);
      expect(component.currentPage).toBe(1);
      expect(component.totalPages).toBe(1);
    });
  });

  test('should emit when page changed', () => {
    const desired = 10;
    component.pageChanged.emit = jest.fn();
    component.paging = { totalCount: 10, currentPage: 1 };

    component.selectPage(desired);

    expect(component.pageChanged.emit).toHaveBeenCalledTimes(1);
    expect(component.pageChanged.emit).toHaveBeenCalledWith({ page: 10, count: 10, offset: 90 });
  });
});
