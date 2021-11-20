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

export const pageOptions: PageOption[] = [
  { text: '10', value: 10 },
  { text: '25', value: 25 },
  { text: '50', value: 50 }
]
