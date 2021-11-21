import { Injectable } from "@angular/core";
import {
  CreateUserResponse,
  DeleteUserResponse,
  User,
  UserParameters,
  UserQueryParameters,
  UserResponse
} from "@core/core.model";
import { UserBackEndService } from "@core/services/user/user-back-end-service";
import { defaultPagination } from "@features/user";
import { UserStore } from "@features/user/store/user.store";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private store: UserStore,
    public userClient: UserBackEndService
  ) {}

  public createUser(user: User): Observable<CreateUserResponse> {
    this.store.setLoading(true);

    return this.userClient.createUser(user)
      .pipe(tap(() => this.reloadUsers()));
  }

  public deleteUser(userId: string): Observable<DeleteUserResponse> {
    this.store.setLoading(true);

    return this.userClient.deleteUser(userId)
      .pipe(tap(() => this.reloadUsers()));
  }

  public getUsers(userParameters: Partial<UserParameters>): void {
    this.store.setLoading(true);
    this.userClient.getUsers(this.getParameters(userParameters))
      .subscribe(
        (response: UserResponse) => {
          this.store.update({ ...response });
          this.store.setLoading(false);
        },
        () => {
          this.store.update({ users: [], totalCount: 0 });
          this.store.setLoading(false);
        }
      );
  }

  public setParameters(parameters: Partial<UserParameters>): void {
    this.store.update({ ...parameters });
    this.getUsers({ ...parameters });
  }

  public reloadUsers(): void {
    this.getUsers({ page: defaultPagination });
  }

  private getParameters(userParameters: Partial<UserParameters>): UserQueryParameters {
    const userQueryParameters: UserQueryParameters = { 
      query: userParameters.query ? userParameters.query : '',
      page: `${userParameters.page?.page}`,
      offset: `${userParameters.page?.offset}`,
      count: `${userParameters.page?.count}`
    };

    return userQueryParameters;
  }
}
