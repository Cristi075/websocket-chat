import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';

import { RoleService } from '../../service/role.service';
import { Role } from '../../model/role';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/debounceTime';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css'],
  outputs: ['errorEmitter'],
  providers: [
    RoleService
  ]
})
export class UserFormComponent implements OnInit {
  private user: any = {}; // The object where the data will be stored 
  @Input() private editable: boolean = true; // Whether the form is editable or not (accesed as an input by using a setter)
  @Output() errorEmitter: EventEmitter<boolean> = new EventEmitter(); // Emitter used to signal the parent component about a change

  @ViewChild('userForm') private form; // A reference to the form
  private error: boolean; // Whether the form contains an error or not (decided by validation logic)
  private messages: any = {}; // Error messages that will be displayed on the form

  private role: Role;
  private availableRoles: Role[] = [];

  @Input() set model(user: any) {
    this.user = user;
    if (user.id == undefined || user.roles.length==0) {
      this.roleService.getRoles().subscribe(roles => this.availableRoles = roles);
    } else {
      this.loadRoles();
    }
  }

  constructor(
    private roleService: RoleService // used to retrieve available roles
  ) { }

  ngOnInit() {

    this.form.valueChanges
      .debounceTime(500)
      .subscribe(values => {

        this.error = !this.checkInputs(values);
        this.errorEmitter.emit(this.error);
      });
  }

  private loadRoles(): void {
    this.roleService.getRoles().subscribe(roles => {
      this.role = this.user.roles[0];

      let filtered = roles.filter((role: Role) => role.id != this.role.id);
      filtered.push(this.role);
      this.availableRoles = filtered;
    });
  }

  private checkInputs(values): boolean {
    this.user.roles = [];
    this.user.roles.push(this.role);

    let result: boolean = true;

    if (this.validateUsername(values.username) == false) {
      result = false;
    }

    // If the ID is null we're creating a new user so a password is required too
    if (this.user.id == null) {
      if (values.password == null || values.password == "") {
        result = false;
      }
    }

    if (this.validateFullName(values.fullName) == false) {
      result = false;
    }

    return result;
  }

  private validateUsername(username): boolean {
    if (username == null || username == "") {
      this.messages.username = null;
      return false;
    } else {
      if (username.match(/^[a-zA-Z][a-zA-Z_0-9]*$/) == null) {
        this.messages.username = "Invalid username. Usernames should begin with a letter and contain only letters, digits and underscores";
        return false;
      } else {
        this.messages.username = null;
        return true;
      }
    }
  }

  private validateFullName(fullName): boolean {
    if (fullName == null || fullName == "") {
      this.messages.fullName = null;
      return false;
    } else {
      if (fullName.match(/^[a-zA-Z ]+$/) == null) {
        this.messages.fullName = "Error: Full name should contain only alphabetic characters and spaces";
        return false;
      } else {
        this.messages.fullName = null;
        return true;
      }
    }
  }

  public validateInputs(): boolean {
    return this.checkInputs(this.form.value);
  }
}
