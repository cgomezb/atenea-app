import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { Page, Paging, PageOption, NavOption } from './pagination-model';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PaginationComponent {
  public currentPageOption: PageOption = { text: '10', value: 10 };
  public NavOption = NavOption;
  public currentPage = 1;
  public totalPages = 1;
  public pageSize = 10;
  public totalRecords = 0;

  @Input() options: PageOption[] = [];
  @Input() desiredPages = 5;
  @Input() public set pageOption(option: PageOption) {
    if (!option) { return; }
    this.pageSize = option.value;
    this.currentPageOption = option;
  }
  @Input() public set paging(paging: Paging | null) {
    if (!paging) {
      return;
    }
    this.totalRecords = paging.totalCount;
    this.currentPage = paging.currentPage;
    this.totalPages = Math.ceil((paging.totalCount || 1) / this.pageSize);
  }
  @Output() pageChanged = new EventEmitter<Page>();

  public selectPage(desired: number | NavOption): void {
    const [first, last, current] = [1, this.totalPages, this.currentPage];
    const outOfRange = (requested: number) => requested < first || requested > last;
    const navigations: {[type in NavOption]?: () => number } = {
      [NavOption.First]: () => first,
      [NavOption.Prev]: () => outOfRange(current - 1) ? current : current - 1,
      [NavOption.Next]: () => outOfRange(current + 1) ? current : current + 1,
      [NavOption.Last]: () => last,
    };
    const navigate: () => number = navigations[desired as NavOption] as () => number;
    const page: number = navigate ? navigate() : desired as number;
    const count = this.pageSize;
    const offset = ((page - 1) * count);
    this.pageChanged.emit({ page, count, offset });
  }

  public getPages(): number[] {
    const pagesList = [...Array(this.totalPages).keys()].map(page => page + 1);
    if (this.totalPages <= this.desiredPages) {
      return pagesList;
    }
    const [first, last, current] = [1, this.totalPages, this.currentPage];
    const fixRange = (reqBeg: number, reqEnd: number) => {
      if (reqBeg >= first && reqEnd <= last) { return [reqBeg - 1, reqEnd - 1]; }
      if (reqBeg < first) { const fix = first - reqBeg; return [reqBeg + fix - 1, reqEnd + fix - 1]; }
      if (reqEnd > last) { const fix = reqEnd - last; return [reqBeg - fix, reqEnd - fix]; }
      return [first, last];
    };
    const half = Math.floor(this.desiredPages / 2);
    const beg = current - half;
    const end = beg + this.desiredPages;
    return pagesList.slice(...fixRange(beg, end));
  }

  public getRecordsRange(): string {
    const startRange = (this.pageSize * (this.currentPage - 1)) + 1;
    const endRange = this.currentPage === this.totalPages ? this.totalRecords : this.pageSize * this.currentPage;
    return !startRange || !endRange || !this.totalRecords ? '' :
      `${startRange} - ${endRange} of ${this.totalRecords}`;
  }

  public onSelectedRowPage(pageOption: PageOption): void {
    this.pageSize = pageOption.value;
    this.currentPageOption = pageOption;
    this.selectPage(NavOption.First);
  }
}
