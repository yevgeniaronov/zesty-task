import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { Observable } from 'rxjs';
import { User } from './../types/user';
// in real-world app always prefer barrel/alias imports over relatives
import { UsersService } from './../users.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';

const tableColumns = [
  { key: 'name', text: 'Name' },
  { key: 'last_name', text: 'Last Name' },
  { key: 'age', text: 'Age' },
  { key: 'image_url', text: 'Image' },
];
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  numberOfRows = 0;
  userModalOpen = false;
  fetchUsersInterval?: any;

  tableData = {
    keys: tableColumns.map((item) => item.key),
    tableColumns,
  };

  users$?: Observable<User[]>;

  constructor(private usersService: UsersService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
  }

  createUserFetchInterval() {
    clearInterval(this.fetchUsersInterval);
    this.fetchUsersInterval = setInterval(() => {
      if (!this.userModalOpen) {
        this.refillData();
      }
    }, 10000);
  }

  clearUsers() {
    this.usersService.clearUsers();
  }

  refillData() {
    this.clearUsers();
    this.getUsers(this.numberOfRows);
  }

  getUsers(count: number) {
    this.usersService.getUsers(count);
    this.createUserFetchInterval();
  }

  onRowChange(count: number) {
    this.getUsers(count);
  }

  toggleDialog(item: any, open: boolean = true) {
    this.dialog.open(DialogContentComponent, { data: item });
  }

  ngOnDestroy() {
    clearInterval(this.fetchUsersInterval);
  }
}
