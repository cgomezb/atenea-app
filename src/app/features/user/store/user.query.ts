import { Query } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { UserState, UserStore } from "./user.store";
import { Paging } from '@core/core.model';

@Injectable({
  providedIn: 'root'
})

export class UserQuery extends Query<UserState> {
  public users$ = this.select('users');
  public totalCount$ = this.select('totalCount');
  public query$ = this.select('query');
  public page$ = this.select('page');
  public loading$ = this.selectLoading();

  public paging$: Observable<Paging> =
    this.select(['totalCount', 'page'])
      .pipe(map(({ totalCount, page: { page: currentPage } }) => ( { totalCount, currentPage } )));

  public currentQuery(): string {
    return this.store.getValue()?.query;
  }

  constructor(protected store: UserStore) {
    super(store);
  }
}
