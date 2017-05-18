import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';

import { HttpService } from './http.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Role } from '../model/role';

@Injectable()
export class RoleService {
  private rolesUrl: string = '/role/';
  private headers: Headers;

  constructor(
    private httpService: HttpService
  ) { }

  getRoles(): Observable<Role[]> {
    return this.httpService.get(this.rolesUrl)
      .map((res: Response) => res.json());
  }
}
