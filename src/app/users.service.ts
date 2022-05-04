import { ApiClientService } from './api-client.service';
import { User } from './types/user';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private users = new BehaviorSubject<User[]>([]);
  public users$ = this.users.asObservable();
  private usersSubscription = new Subscription()
  
  constructor(
    private apiClient: ApiClientService
  ) { }
  
  public addUser(){
    
     this.usersSubscription =  this.apiClient.getRandomUser().subscribe((user) => this.users.next([...this.users.value, user]))
    
      
  }
}
