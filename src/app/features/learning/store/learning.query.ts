import { Query } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { LearningState, LearningStore } from "./learning.store";
import { Paging } from '@core/core.model';

@Injectable({
  providedIn: 'root'
})

export class LearningQuery extends Query<LearningState> {
  public learnings$ = this.select('learnings');
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

  constructor(protected store: LearningStore) {
    super(store);
  }
}
