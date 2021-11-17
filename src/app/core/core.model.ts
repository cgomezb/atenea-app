export interface Page {
  page: number;
  count: number;
  offset: number;
}

export interface Paging {
  totalCount: number;
  currentPage: number;
}

// Parameters
export interface UserParameters {
  query: string;
  page: Page;
}

// Response
export interface UserResponse {
  users: User[];
  totalCount: number;
}

// User
export interface User {
  id?: string;
  avatar: string;
  name: string;
  email: string;
  learnings?: string[];
}
