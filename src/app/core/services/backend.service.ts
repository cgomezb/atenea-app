import {
  CreateLearningResponse,
  CreateUserResponse,
  DeleteLearningResponse,
  DeleteUserResponse,
  Learning,
  LearningQueryParameters,
  LearningResponse,
  LearningStatus,
  User,
  UserInfo,
  UserLearning,
  UserLearningInfoResponse,
  UserQueryParameters,
  UserResponse
} from "@core/core.model";
import { v4 as uuid } from 'uuid';
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";
import { users } from '@core/services/user/user.data';
import { learnings } from "@core/services/learning/learning.data";
import { userLearning } from "@core/services/user-learning/user-learning.data";

@Injectable({
  providedIn: 'root'
})

export class BackEndService {
  private users: User[] = users;
  private learnings: Learning[] = learnings;
  private userLearning: UserLearning[] = userLearning;
  private delayTime = 1000;

  // User

  public getUsers({ query, offset, count }: UserQueryParameters): Observable<UserResponse> {
    const filtered = this.users.filter(user => user.name.search(new RegExp(query, 'gi')) >= 0 ||
      user.email.search(new RegExp(query, 'gi')) >= 0);

    let paged = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(count));

    if (paged.length > 0) {
      paged = this.getUserLearnings(paged);
    }

    return of({ users: paged, totalCount: filtered.length })
      .pipe(delay(this.delayTime));
  }

  public createUser(user: User): Observable<CreateUserResponse> {
    user.id = this.generateId();
    this.users.push(user);

    return of({ user })
      .pipe(delay(this.delayTime));
  }

  public deleteUser(userId: string): Observable<DeleteUserResponse> {
    this.users = this.users.filter(user => user.id !== userId);
  
    return of({ userId })
      .pipe(delay(this.delayTime));
  }

  // Learning

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
    this.userLearning = this.userLearning.filter(ul => ul.learningId !== learningId);
  
    return of({ learningId })
      .pipe(delay(this.delayTime));
  }

  public updateLearningStatus(learningId: string): Observable<DeleteLearningResponse> {
    let learning = this.learnings.find(learning => learning.id === learningId);
  
    if (learning) {
      const status = learning.status === LearningStatus.archive
        ? LearningStatus.unarchive
        : LearningStatus.archive;

      learning = {
        ...learning,
        status
      };

      return of({ learningId })
      .pipe(delay(this.delayTime));
    }

    return of({ learningId: '' })
      .pipe(delay(this.delayTime));
  }

  // User Learning

  public getUserLearningInfo(learningId: string): Observable<UserLearningInfoResponse> {
    const usersInfo = this.getAllUsersInfo();
    const usersAssigned = this.getUsersAssigned(learningId);

    return of({ usersInfo, usersAssigned})
      .pipe(delay(this.delayTime));
  }

  public assignUsers(learningId: string, assignUsers: string[]): Observable<boolean> {
    let userLearning = this.userLearning.filter(ul => ul.learningId === learningId);

    if (assignUsers.length > 0) {
      const newUserLearning: UserLearning = {
        learningId,
        users: assignUsers
      };

      userLearning.push(newUserLearning);
    } else {
      userLearning = this.userLearning.filter(ul => ul.learningId !== learningId);
    }
    
    this.userLearning = userLearning;

    return of(true)
      .pipe(delay(this.delayTime));
  }

  private getUserLearnings(users: User[]): User[] {
    users.forEach(user => {
      user.learnings = this.getLearningsByUserId(user.id ? user.id : '');
    });

    return users;
  }

  private getLearningsByUserId(userId: string): string[] {
    const learningIds = this.userLearning
      .filter(ul => ul.users.includes(userId))
      .map(ul => ul.learningId);

    if (learningIds.length > 0) {
      return this.getLearningNames(learningIds);
    }

    return [];
  }

  private getLearningNames(learningIds: string[]): string[] {
    return this.learnings
      .filter(l => learningIds.includes(l.id ? l.id: ''))
      .map(l =>l.name);
  }

  private getAllUsersInfo(): UserInfo[] {
    const userInfo = this.users?.map(({ id, name }) => ({ id: id ? id : '', name })) || [];
    return userInfo;
  }

  private getUsersAssigned(learningId: string): string[] {
    const userLearning = this.userLearning.find(ul => ul.learningId === learningId);

    if (userLearning) {
      return userLearning.users;
    }

    return [];
  }

  private generateId(): string {
    return uuid();
  }
}