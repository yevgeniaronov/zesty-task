import { UsersService, UserState } from './users.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'zesty-task';
  constructor(public userService: UsersService) {}

  get isLoading() {
    return this.userService.usersState === UserState.Loading;
  }
}
