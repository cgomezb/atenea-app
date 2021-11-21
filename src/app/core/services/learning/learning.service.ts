import { Injectable } from "@angular/core";
import {
  CreateLearningResponse,
  DeleteLearningResponse,
  Learning,
  LearningParameters,
  LearningQueryParameters,
  LearningResponse
} from "@core/core.model";
import { LearningBackEndService } from "@core/services/learning/learning-back-end-service";
import { defaultPagination } from "@features/learning";
import { LearningStore } from "@features/learning/store/learning.store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class LearningService {

  constructor(
    private store: LearningStore,
    public learningClient: LearningBackEndService
  ) {}

  public createLearning(learning: Learning): Observable<CreateLearningResponse> {
    this.store.setLoading(true);

    return this.learningClient.createLearning(learning)
      .pipe(tap(() => this.reloadLearnings()));
  }

  public deleteLearning(learningId: string): Observable<DeleteLearningResponse> {
    this.store.setLoading(true);

    return this.learningClient.deleteLearning(learningId)
      .pipe(tap(() => this.reloadLearnings()));
  }

  public getLearnings(learningParameters: Partial<LearningParameters>): void {
    this.store.setLoading(true);
    this.learningClient.getLearnings(this.getParameters(learningParameters))
      .subscribe(
        (response: LearningResponse) => {
          this.store.update({ ...response });
          this.store.setLoading(false);
        },
        () => {
          this.store.update({ learnings: [], totalCount: 0 });
          this.store.setLoading(false);
        }
      );
  }

  public setParameters(parameters: Partial<LearningParameters>): void {
    this.store.update({ ...parameters });
    this.getLearnings({ ...parameters });
  }

  public reloadLearnings(): void {
    this.getLearnings({ page: defaultPagination });
  }

  private getParameters(learningParameters: Partial<LearningParameters>): LearningQueryParameters {
    const learningQueryParameters: LearningQueryParameters = { 
      query: learningParameters.query ? learningParameters.query : '',
      page: `${learningParameters.page?.page}`,
      offset: `${learningParameters.page?.offset}`,
      count: `${learningParameters.page?.count}`
    };

    return learningQueryParameters;
  }
}
