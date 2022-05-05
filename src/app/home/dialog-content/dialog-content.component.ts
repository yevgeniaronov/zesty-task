import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from './../../types/user';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-content',
  templateUrl: './dialog-content.component.html',
  styleUrls: ['./dialog-content.component.scss'],
})
export class DialogContentComponent implements OnInit {
  constructor(@Inject(MAT_DIALOG_DATA) public data: User) {}

  ngOnInit(): void {}
}
