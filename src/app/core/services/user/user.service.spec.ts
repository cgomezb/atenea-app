import { TestBed } from '@angular/core/testing';
import { CreateUserResponse, DeleteUserResponse, User, UserParameters, UserQueryParameters, UserResponse } from '@core/core.model';
import { UserService, UserBackEndService } from '@core/services';
import { users } from '@core/services/user/user.data';
import { UserStore } from '@features/user/store/user.store';
import { of } from 'rxjs';

describe('UserService', () => {
  let service: UserService;
  let store: UserStore;
  let userClient: UserBackEndService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: UserStore,
          useValue: {
            update: jest.fn(),
            setLoading: jest.fn()
          }
        },
        {
          provide: UserBackEndService,
          useValue: {
            createUser: jest.fn(),
            deleteUser: jest.fn(),
            getUsers: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(UserService);
    store = TestBed.inject(UserStore);
    userClient = TestBed.inject(UserBackEndService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should set parameters', () => {
    service.getUsers = jest.fn();
    const userQueryParameters: UserParameters = {
      query: '',
      page: {
        page: 1,
        offset: 0,
        count: 10
      }
    };

    service.setParameters(userQueryParameters);

    expect(store.update).toHaveBeenCalledWith({ ...userQueryParameters });
    expect(service.getUsers).toHaveBeenCalledWith({ ...userQueryParameters });
  });

  it('should create a user', done => {
    const newUser: User = {
      avatar: '1',
      name: 'John Smith',
      email: 'jsmith@email.com'
    };

    const createUserResponse: CreateUserResponse = {
      user: {
        id: 'affed992-67a4-438f-ab75-a89d7898e16c',
        ...newUser
      }
    };

    const userQueryParameters: UserQueryParameters = {
      query: '',
      page: '1',
      offset: '0',
      count: '10'
    };

    const userResponse: UserResponse = {
      users: [createUserResponse.user],
      totalCount: users.length
    }

    userClient.createUser = jest.fn().mockReturnValue(of(createUserResponse));
    userClient.getUsers = jest.fn().mockReturnValue(of(userResponse));
    
    service.createUser(newUser)
      .subscribe(() => {
        expect(store.setLoading).toHaveBeenCalledWith(true);
        expect(userClient.getUsers).toHaveBeenCalledWith(userQueryParameters);
        expect(store.update).toHaveBeenCalledWith({ ...userResponse });
        expect(store.setLoading).toHaveBeenCalledWith(false);
        done();
      });
  });

  it('should delete a user', done => {
    const userId = 'affed992-67a4-438f-ab75-a89d7898e16c';
    const deleteUserResponse: DeleteUserResponse = { userId };
    const userQueryParameters = {
      query: '',
      page: '1',
      offset: '0',
      count: '10'
    };

    const userResponse: UserResponse = {
      users: [],
      totalCount: users.length
    }

    userClient.deleteUser = jest.fn().mockReturnValue(of(deleteUserResponse));
    userClient.getUsers = jest.fn().mockReturnValue(of(userResponse));
    
    service.deleteUser(userId)
      .subscribe(() => {
        expect(store.setLoading).toHaveBeenCalledWith(true);
        expect(userClient.getUsers).toHaveBeenCalledWith(userQueryParameters);
        expect(store.update).toHaveBeenCalledWith({ ...userResponse });
        expect(store.setLoading).toHaveBeenCalledWith(false);
        done();
      });
  });
});
