import { Observable } from 'rxjs';
import { User } from './../types/user';
// in real-world app always prefer barrel/alias imports over relatives
import { UsersService } from './../users.service';
import { Component, OnInit } from '@angular/core';

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
export class HomeComponent implements OnInit {
  numberOfRows = 0;
  userModalOpen = false;

  tableData = {
    keys: tableColumns.map((item) => item.key),
    tableColumns,
  };

  users$?: Observable<User[]>;

  constructor(private usersService: UsersService) {}

  ngOnInit(): void {
    this.users$ = this.usersService.users$;
  }

  onRowChange(count: number) {
    this.usersService.getUsers(count);
  }

  toggleDialog(item: any, open: boolean = true) {
    console.log(item);
  }
}
