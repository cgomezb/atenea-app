import { Store, StoreConfig } from '@datorama/akita';
import { Injectable } from "@angular/core";
import { Page, LearningParameters, LearningResponse } from '@core/core.model';
import { defaultPagination } from '@features/learning';

export type LearningState = LearningParameters & LearningResponse;

function createInitialState(page: Page): LearningState {
  return {
    learnings: [],
    totalCount: 0,
    query: '',
    page
  };
}

@StoreConfig({ name: 'learnings' })
@Injectable({
  providedIn: 'root'
})

export class LearningStore extends Store<LearningState> {
  constructor() {
    super(createInitialState(defaultPagination));
  }
}
