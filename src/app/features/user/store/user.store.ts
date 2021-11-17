import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { Page, UserParameters, UserResponse } from '@core/core.model';
import { defaultPagination } from '../';

export type UserState = UserParameters & UserResponse;

function createInitialState(page: Page): UserState {
  return {
    users: [],
    totalCount: 0,
    query: '',
    page
  };
}

@StoreConfig({ name: 'users' })
@Injectable({
  providedIn: 'root'
})

export class UserStore extends Store<UserState> {
  constructor() {
    super(createInitialState(defaultPagination));
  }
}
