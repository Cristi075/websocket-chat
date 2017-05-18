import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DialogService } from "ng2-bootstrap-modal";
import { InfoComponent } from '../../dialogs/info/info.component';
import { InputComponent } from '../../dialogs/input/input.component';

import { UserFormComponent } from '../user-form/user-form.component';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth.service';
import { User } from '../../model/user';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [
    UserService
  ]
})
export class UserDetailComponent implements OnInit {

  private user: User;
  private error: boolean;
  private editMode: boolean = false;
  private message: string;
  private updated: boolean;
  @ViewChild(UserFormComponent) private form: UserFormComponent;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dialogService: DialogService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.loadData();
  }

  private loadData(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.userService.getUserById(id)
        .subscribe((user: User) => this.user = user);
    });
  }

  private toggleMode(): void {
    this.message = null;
    this.updated = null;
    this.editMode = !this.editMode;

    if (this.editMode == false) {
      this.loadData();
    }
  }

  onSubmit() {
    if (this.form.validateInputs() == true) {
      this.userService.updateUser(this.user)
        .subscribe(
        book => {
          this.toggleMode();
          this.updated = true;
          this.message = "The user was updated sucessfully";
        },
        err => {
          this.updated = false;
          if (err.status == 400) {
            this.message = "ERROR:" + err._body;
          } else {
            this.message = "ERROR: The user could not be updated";
          }
        }
        )
    } else {
      this.updated = false;
      this.message = "Error: Invalid data";
    }
  }

  changePassword(): void {
    this.dialogService.addDialog(
      InputComponent,
      {
        title: "Enter the new password",
        placeholder: "New password",
        type: "password"
      }
    ).subscribe(userInput => {
      if (userInput == null) {
        this.showMessage("Canceled", "Operation canceled by user", false);
      } else {
        this.userService.changePassword(this.user, userInput)
          .subscribe(
          client => {
            this.showMessage(
              "Sucess",
              "Password updated sucessfully",
              true);
          },
          err => {
            this.showMessage(
              "Error",
              "Password could not be updated",
              false);
          });
      }
    });
  }

  processEvent(event): void {
    this.error = event;
  }

  showMessage(title: string, message: string, success: boolean): void {
    this.dialogService.addDialog(
      InfoComponent,
      {
        title: title,
        message: message,
        success: success
      }
    );
  }

}
