import { Observable } from 'rxjs';
import { User } from './../types/user';
// in real-world app always prefer barrel/alias imports over relatives
import { UsersService } from './../users.service';
import { Component, OnInit, } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  numberOfRows = 0;
  userModalOpen = false;
  users$?: Observable<User[]>;

  constructor(private usersService: UsersService) { }

  ngOnInit(): void {
    this.users$ =  this.usersService.users$
    this.usersService.addUser()
  }


  

}
