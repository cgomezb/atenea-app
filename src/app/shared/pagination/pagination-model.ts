export interface Page {
  page: number;
  count: number;
  offset: number;
}

export interface Paging {
  totalCount: number;
  currentPage: number;
}

export enum NavOption {
  First = 'first',
  Prev = 'prev',
  Next = 'next',
  Last = 'last',
}

export interface PageOption {
  text: string;
  value: number;
}
