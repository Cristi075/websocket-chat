import { Component, OnInit, ViewChild } from '@angular/core';

import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css'],
  providers: [
    UserService
  ]
})
export class UserAddComponent implements OnInit {
  private user: any = {};
  private error: boolean = true;
  private created: boolean = null;
  private message: string = null;
  @ViewChild(UserFormComponent) private form: UserFormComponent;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.form.validateInputs() == true) {
      this.userService.createUser(this.user)
        .subscribe(
        user => {
          this.created = true;
          this.message = "The user was added sucessfully";
        },
        err => {
          this.created = false;
          if (err.status == 400) {
            this.message = "ERROR:" + err._body;
          } else {
            this.message = "ERROR: The new user could not be added";
          }
        });
    } else {
      this.created = false;
      this.message = "Error: Invalid data";
    }
  }

  processEvent(event): void {
    this.error = event;
  }

}
