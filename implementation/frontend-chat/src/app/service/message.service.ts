import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Message } from '../model/message';

import { StompService } from '../service/stomp.service';

@Injectable()
export class MessageService {


  private baseUrl: string = "/user/topic/messages/convId="
  private url: string;

  private observable: Subject<Message[]> = new Subject<Message[]>();

  constructor(
    private stompService: StompService
  ) { }

  public getObservable(): Observable<Message[]> {
    return this.observable.asObservable();
  }

  // call this method from the onInit method of the component using this service
  // The parameter should be the conversation id that you want to subscribe to
  public subscribe(id: number): void {
    this.url = this.baseUrl + id;
    this.stompService.subscribe(this.url, msg => this.parseMessagesData(msg));
  }

  // call this method from the onDestroy method of the component using this service
  public unsubscribe(): void {
    this.stompService.unsubscribe(this.url);
  }

  private parseMessagesData(msg): void {
    this.observable.next(JSON.parse(msg.body));
  }

  public sendMessage(conversationId: number, message: Message) {
    this.stompService.publish("/message/convId=" + conversationId, JSON.stringify(message));
  }

}
