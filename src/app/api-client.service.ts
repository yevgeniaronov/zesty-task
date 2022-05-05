import { User } from './types/user';
import { Injectable } from '@angular/core';
import { combineLatest, debounceTime, delay, map, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  constructor(private httpClient: HttpClient) { }

  public getUsers(count: number): Observable<User[]> {

    const observables = new Array(count).fill(this.getRandomUser());
    return combineLatest(observables).pipe(debounceTime(4000))
  }
  private getRandomUser(): Observable<User> {
    return this.httpClient
      .get<User>('https://v82tr0s6oa.execute-api.us-east-1.amazonaws.com/dev/')
     
  }
}
