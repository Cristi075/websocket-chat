import { Component, OnInit } from '@angular/core';

import { AuthService } from '../service/auth.service';
import { StompService } from '../service/stomp.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private stompService: StompService
  ) { }

  ngOnInit() {
  }

}
