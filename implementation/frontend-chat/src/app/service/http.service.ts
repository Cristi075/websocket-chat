import { Injectable } from '@angular/core';
import { Http, Response, Headers, ResponseContentType } from '@angular/http';
  
import { AuthService } from './auth.service';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService {
  private headers: Headers;

  constructor(
    private http: Http,
    private authService: AuthService
  ) {
    this.headers = new Headers({ 'Content-Type': 'application/json' });
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  get(url: string) {
    this.addAuthenticationHeader();
    return this.http.get(url, { headers: this.headers }).catch(this.handleError);
  }

  getBlob(url: string) {
    this.addAuthenticationHeader();
    return this.http.get(url, {
      headers: this.headers,
      responseType: ResponseContentType.Blob
    }).catch(this.handleError);
  }

  post(url: string, body: Object) {
    this.addAuthenticationHeader();
    return this.http.post(url, body, { headers: this.headers }).catch(this.handleError);
  }

  put(url: string, body: Object) {
    this.addAuthenticationHeader();
    return this.http.put(url, body, { headers: this.headers }).catch(this.handleError);
  }

  delete(url: string) {
    this.addAuthenticationHeader();
    return this.http.delete(url, { headers: this.headers }).catch(this.handleError);
  }

  
  private addAuthenticationHeader(): void {
    if (this.authService.isAuthenticated() == false) {
      this.headers.delete('Authorization');
      return;
    }
    let token = localStorage.getItem('token');

    if (token != null) {
      if (this.headers.has('Authorization')) {
        this.headers.set('Authorization', token);
      } else {
        this.headers.append('Authorization', token);
      }
    }
  }
  

  private handleError(error: Response | any) {
    console.log(error);
    return Observable.throw(error);
  }

}
