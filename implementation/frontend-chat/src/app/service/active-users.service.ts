import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user';

import { StompService } from '../service/stomp.service';

@Injectable()
export class ActiveUsersService {
  private url: string = "/topic/active";

  private activeUsersObservable: Subject<User[]> = new Subject<User[]>();


  constructor(
    private stompService: StompService
  ) { }

  public getObservable(): Observable<User[]>{
    return this.activeUsersObservable.asObservable();
  }

  // call this method from the onInit method of the component using this service
  public subscribe(): void{
    this.stompService.subscribe(this.url, msg => this.parseUsersData(msg));
  }

  // call this method from the onDestroy method of the component using this service
  public unsubscribe(): void{
    this.stompService.unsubscribe(this.url);
  }

  private parseUsersData(msg): void {
    let userList = JSON.parse(msg.body);
    userList = userList.sort((u1: User, u2: User) => u1.id - u2.id);
    this.activeUsersObservable.next(userList);
  }
}
