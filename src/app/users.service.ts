import { ApiClientService } from './api-client.service';
import { User } from './types/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';
export enum UserState {
  Idle,
  Loading,
  Ready,
  Error,
}
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = new BehaviorSubject<User[]>([]);
  public users$ = this.users.asObservable();
  private usersSubscription = new Subscription();
  public usersState = UserState.Idle;
  constructor(private apiClient: ApiClientService) {}

  public clearUsers() {
    this.users.next([]);
  }

  public getUsers(count: number) {
    this.usersSubscription.unsubscribe(); // cancels previous call for rows
    this.usersState = UserState.Loading;
    this.usersSubscription = this.apiClient
      .getUsers(count)
      .subscribe((users) => {
        this.usersState = UserState.Ready;
        this.users.next(users);
      });
  }
}
