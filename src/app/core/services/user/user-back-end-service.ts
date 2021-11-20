import {
  CreateUserResponse,
  DeleteUserResponse,
  User,
  UserQueryParameters,
  UserResponse
} from "@core/core.model";
import { users } from './user.data';
import { v4 as uuid } from 'uuid';
import { Observable, of } from "rxjs";
import { Injectable } from "@angular/core";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserBackEndService {
  private users: User[] = users;
  private delayTime = 1000;

  public getUsers({ query, offset, count }: UserQueryParameters): Observable<UserResponse> {
    const filtered = this.users.filter(user => user.name.search(new RegExp(query, 'gi')) >= 0 ||
      user.email.search(new RegExp(query, 'gi')) >= 0);

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
  
    return of({ userId })
      .pipe(delay(this.delayTime));
  }

  private generateId(): string {
    return uuid();
  }
}
