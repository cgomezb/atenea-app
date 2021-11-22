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
    let filtered = this.users.filter(user => user.name.search(new RegExp(query, 'gi')) >= 0 ||
      user.email.search(new RegExp(query, 'gi')) >= 0);

    if (filtered.length > 0) {
      filtered = this.getUserLearnings(filtered);
      filtered = filtered.sort((a, b) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }

    const paged = filtered.slice(parseInt(offset), parseInt(offset) + parseInt(count));

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
    this.deleteUserFromUserLearning(userId);
  
    return of({ userId })
      .pipe(delay(this.delayTime));
  }

  // Learning

  public getLearnings({ query, offset, count }: LearningQueryParameters): Observable<LearningResponse> {
    let filtered = this.learnings.filter(learning => learning.name.search(new RegExp(query, 'gi')) >= 0 ||
      learning.status.search(new RegExp(query, 'gi')) >= 0);

    if (filtered.length > 0) {
      filtered = filtered.sort((a, b) => {
        const nameA = a.name.toUpperCase(); 
        const nameB = b.name.toUpperCase();

        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }

        return 0;
      });
    }

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
    let learnings = this.learnings.filter(learning => learning.id !== learningId);
  
    if (learning) {
      const status = learning.status === LearningStatus.archive
        ? LearningStatus.unarchive
        : LearningStatus.archive;

      const updatedLearning = {
        ...learning,
        status
      };

      learnings.push(updatedLearning);
      this.learnings = learnings;

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
    const userLearning = this.userLearning.find(ul => ul.learningId === learningId);
    const usersLearning = this.userLearning.filter(ul => ul.learningId !== learningId);

    if (userLearning) {
      const newUserLearning: UserLearning = { ...userLearning, users: assignUsers };
      usersLearning.push(newUserLearning);
    }

    this.userLearning = usersLearning;

    return of(true)
      .pipe(delay(this.delayTime));
  }

  private getUserLearnings(users: User[]): User[] {
    let usersWithLearnings: User[] = [];
 
    users.forEach(user => {
      const userWithLearning = {
        ...user,
        learnings: this.getLearningsByUserId(user.id ? user.id : '')
      }
      usersWithLearnings.push(userWithLearning);
    });

    return usersWithLearnings;
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

  private deleteUserFromUserLearning(userId: string) {
    let usersLearning: UserLearning[] = [];

    this.userLearning.forEach(ul => {
      let users = [];

      if (ul.users.includes(userId)) {
        users = ul.users.filter(u => u !== userId);

        const userLearning = { ...ul, users };
        usersLearning.push(userLearning);
      } else {
        usersLearning.push(ul);
      }
    });

    this.userLearning = usersLearning;
  }

  private generateId(): string {
    return uuid();
  }
}