import { Page } from "@core/core.model";

export const defaultPagination: Page = {
  page: 1,
  offset: 0,
  count: 10
}

export const userHeaders: string[] = ['Avatar', 'Name', 'Email', 'Actions'];

export const userAvatars: { name: string, value: number }[] = [
  { name: 'Avatar 1', value: 1 },
  { name: 'Avatar 2', value: 2 },
  { name: 'Avatar 3', value: 3 },
  { name: 'Avatar 4', value: 4 }
];

// Dialog config

export const createUserDialogConfig = {
  disableClose: true
}
