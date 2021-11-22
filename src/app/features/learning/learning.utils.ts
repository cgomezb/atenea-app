import { Page } from "@core/core.model";

export const defaultPagination: Page = {
  page: 1,
  offset: 0,
  count: 10
}

export const learningHeaders: string[] = ['Name', 'Status', 'Actions'];

// Dialog config

export const learningDialogConfig = {
  disableClose: true
}

export const userLearningAssignDialogConfig = {
  disableClose: true,
  width: '500px',
  height: '250px'
}

export const learningConfirmDialogConfig = {
  disableClose: true,
  data: {
    title: 'Delete learning',
    message: `Are you sure do you want to delete the learning?`
  }
}
