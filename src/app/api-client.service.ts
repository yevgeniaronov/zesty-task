import { User } from './types/user';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(count: number = 3): Observable<User[]> {

    const observables = new Array(count).fill(this.getRandomUser());
    return combineLatest(observables)
  }
  private getRandomUser(): Observable<User> {
    return this.httpClient
      .get<User>('https://gne5ydctv0.execute-api.us-east-1.amazonaws.com/prod/').pipe(map((user) => user))
     
  }
}
