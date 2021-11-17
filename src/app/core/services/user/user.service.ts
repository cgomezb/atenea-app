import { Injectable } from "@angular/core";
import { User, UserParameters } from "@core/core.model";
import { UserStore } from "@features/user/store/user.store";

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private store: UserStore) {}

  public createUser(user: User): void {

  }

  public deleteUser(userId: string): void {

  }

  public getUsers(userParameters: Partial<UserParameters>): void {

  }

  public setParameters(parameters: Partial<UserParameters>): void {
    this.store.update({ ...parameters });
    this.getUsers({ ...parameters });
  }
}
