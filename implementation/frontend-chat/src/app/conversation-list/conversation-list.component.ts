import { Component, OnInit, OnDestroy } from '@angular/core';

import { Conversation } from '../model/conversation';

import { StompService } from '../service/stomp.service';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.css']
})
export class ConversationListComponent implements OnInit, OnDestroy {

  private url: string = "/user/topic/conversation-list";
  private conversations: Conversation[];

  constructor(
    private stompService: StompService
  ) { }

  ngOnInit() {
    this.stompService.subscribe(this.url,msg => this.parseData(msg));
  }

  ngOnDestroy() {
    this.stompService.unsubscribe(this.url);
  }

  private parseData(msg): void{
    this.conversations = JSON.parse(msg.body);
  }

}
