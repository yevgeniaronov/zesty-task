import { ApiClientService } from './api-client.service';
import { User } from './types/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private users = new BehaviorSubject<User[]>([]);
  public users$ = this.users.asObservable();
  private usersSubscription = new Subscription();

  constructor(private apiClient: ApiClientService) {}

  public clearUsers() {
    this.users.next([]);
  }

  public getUsers(count: number) {
    this.usersSubscription.unsubscribe(); // cancels previous call for rows
    this.usersSubscription = this.apiClient
      .getUsers(count)
      .subscribe((users) => this.users.next(users));
  }
}
