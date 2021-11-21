import {
  CreateLearningResponse,
  DeleteLearningResponse,
  Learning,
  LearningQueryParameters,
  LearningResponse
} from "@core/core.model";
import { learnings } from './learning.data';
import { v4 as uuid } from 'uuid';
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class LearningBackEndService {
  private learnings: Learning[] = learnings;
  private delayTime = 1000;

  public getLearnings({ query, offset, count }: LearningQueryParameters): Observable<LearningResponse> {
    const filtered = this.learnings.filter(learning => learning.name.search(new RegExp(query, 'gi')) >= 0 ||
      learning.status.search(new RegExp(query, 'gi')) >= 0);

    const paged = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(count));

    return of({ learnings: paged, totalCount: filtered.length })
      .pipe(delay(this.delayTime));
  }

  public createLearning(learning: Learning): Observable<CreateLearningResponse> {
    learning.id = this.generateId();
    this.learnings.push(learning);

    return of({ learning })
      .pipe(delay(this.delayTime));
  }

  public deleteLearning(learningId: string): Observable<DeleteLearningResponse> {
    this.learnings = this.learnings.filter(learning => learning.id !== learningId);
  
    return of({ learningId })
      .pipe(delay(this.delayTime));
  }

  private generateId(): string {
    return uuid();
  }
}
