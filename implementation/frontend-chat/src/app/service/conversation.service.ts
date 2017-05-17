import { Injectable } from '@angular/core';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

import { Conversation } from '../model/conversation';

import { StompService } from '../service/stomp.service';

@Injectable()
export class ConversationService {

  private baseUrl: string = "/user/topic/conversation/"
  private url: string;

  private observable: Subject<Conversation> = new Subject<Conversation>();

  constructor(
    private stompService: StompService
  ) { }

  public getObservable(): Observable<Conversation> {
    return this.observable.asObservable();
  }

  // call this method from the onInit method of the component using this service
  // The parameter should be the conversation id that you want to subscribe to
  public subscribe(id: number): void {
    this.url = this.baseUrl + id;
    this.stompService.subscribe(this.url, msg => this.parseConversationData(msg));
  }

  // call this method from the onDestroy method of the component using this service
  public unsubscribe(): void {
    this.stompService.unsubscribe(this.url);
  }

  private parseConversationData(msg): void {
    this.observable.next(JSON.parse(msg.body));
  }

  public updateConversation(conversation: Conversation) {
    this.stompService.publish("/conversation/" + conversation.id, JSON.stringify(conversation));
  }

}
