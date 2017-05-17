import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { Conversation } from '../model/conversation';
import { Message } from '../model/message';

import { StompService } from '../service/stomp.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  private users: User[];
  private conversation: Conversation;
  private messages: Message[];
  private newMessage: string;

  constructor(
    private stompService: StompService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.stompService.subscribe("/topic/active", (msg) => this.parseUsersData(msg));
    this.stompService.subscribe("/user/topic/conversation/1", (msg) => this.parseConversationData(msg));
    this.stompService.subscribe("/user/topic/messages/convId=1", (msg) => this.parseMessagesData(msg));
  }

  ngOnDestroy() {
    this.stompService.unsubscribe("/topic/active");
    this.stompService.unsubscribe("/user/topic/conversation/1");
    this.stompService.unsubscribe("/user/topic/messages/convId=1");
  }

  private parseUsersData(msg): void{
    let userList = JSON.parse(msg.body);
    this.users = userList.sort((u1: User, u2: User) => u1.id - u2.id);
  }

  private parseConversationData(msg): void{
    this.conversation = JSON.parse(msg.body);
  }

  private parseMessagesData(msg): void{
    this.messages = JSON.parse(msg.body);
  }

  private addUser(user: User){
    this.conversation.members.push(user);
    this.stompService.publish("/conversation/"+this.conversation.id, JSON.stringify(this.conversation));
  }

  private removeUser(user: User){
    let usernames: string[] = this.conversation.members.map(u => u.username);
    let index = usernames.indexOf(user.username);
    this.conversation.members.splice(index,1);
    this.stompService.publish("/conversation/"+this.conversation.id, JSON.stringify(this.conversation));
  }

  private send(): void{
    let msg = new Message();
    msg.id = null;
    msg.author = null;
    msg.sentAt = null;
    msg.content = this.newMessage;

    this.stompService.publish("/message/convId="+this.conversation.id, JSON.stringify(msg));
    this.newMessage = "";
  }

  private canBeAdded(username: string): boolean{
    let usernames: string[] = this.conversation.members.map(u => u.username);
    return !usernames.includes(username);
  }
}
