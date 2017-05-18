import { Component, OnInit, OnDestroy } from '@angular/core';

import { ActiveUsersService } from '../../service/active-users.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-active-user-list',
  templateUrl: './active-user-list.component.html',
  styleUrls: ['./active-user-list.component.css'],
  providers: [
    ActiveUsersService
  ]
})
export class ActiveUserListComponent implements OnInit, OnDestroy {

  private users: User[];

  constructor(
    private activeUserService: ActiveUsersService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.activeUserService.subscribe();
    this.activeUserService.getObservable()
      .subscribe( users => this.users = users);
  }

  ngOnDestroy() {
    this.activeUserService.unsubscribe();
  }
}
