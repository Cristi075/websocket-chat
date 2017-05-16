import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private username: string;
  private password: string;
  private message: string = null;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.login(this.username, this.password)
      .subscribe(
      (res: any) => {
        this.router.navigateByUrl('/'); // Go to homepage. Login was done & sucesfully
      },
      (err: any) => { this.message = "Invalid username or password"; }
      )
  }

}
