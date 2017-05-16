import { Component, OnInit, OnDestroy } from '@angular/core';


import { UserService } from '../../service/user.service';
import { User } from '../../model/user';

import { StompService } from '../../service/stomp.service';

@Component({
  selector: 'app-active-user-list',
  templateUrl: './active-user-list.component.html',
  styleUrls: ['./active-user-list.component.css'],
  providers: [
    UserService
  ]
})
export class ActiveUserListComponent implements OnInit, OnDestroy {

  private users: User[];

  constructor(
    private stompService: StompService
  ) { }

  ngOnInit() {
    this.stompService.subscribe("/topic/active", (msg) => this.parseUsersData(msg));
  }

  ngOnDestroy() {
    this.stompService.unsubscribe("/topic/active");
  }

  private parseUsersData(msg): void{
    let userList = JSON.parse(msg.body);
    this.users = userList.sort((u1: User, u2: User) => u1.id - u2.id);
  }
}
