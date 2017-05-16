import { Injectable } from '@angular/core';
import { Response } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { User } from '../model/user';

@Injectable()
export class UserService {
  private userUrl: string = 'http://localhost:8080/chat/api/user/';

  constructor(
    private httpService: HttpService
  ) { }

  getUsers(): Observable<User[]> {
    return this.httpService.get(this.userUrl)
      .map((res: Response) => res.json());
  }

  getUserById(id: number): Observable<User> {
    return this.httpService.get(this.userUrl + 'id=' + id)
      .map((res: Response) => res.json());
  }

  createUser(user: Object): Observable<User> {
    return this.httpService.post(this.userUrl, user)
      .map((res: Response) => res.json());
  }

  updateUser(user: User): Observable<User> {
    return this.httpService.put(this.userUrl + user.id, user)
      .map((res: Response) => res.json());
  }

  deleteUser(id: number) {
    return this.httpService.delete(this.userUrl + id)
      .map((res: Response) => res);
  }

  changePassword(user: User, newPassword: string): Observable<User> {
    (user as any).password = newPassword;
    return this.httpService.put(this.userUrl + user.id, user)
      .map((res: Response) => res.json());
  }
}
