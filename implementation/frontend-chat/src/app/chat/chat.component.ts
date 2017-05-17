import { Component, OnInit } from '@angular/core';

import { User } from '../model/user';
import { Conversation } from '../model/conversation';
import { Message } from '../model/message';

import { AuthService } from '../service/auth.service';
import { ActiveUsersService } from '../service/active-users.service';
import { ConversationService } from '../service/conversation.service';
import { MessageService } from '../service/message.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [
    ActiveUsersService,
    ConversationService,
    MessageService
  ]
})
export class ChatComponent implements OnInit {

  private users: User[];
  private conversation: Conversation;
  private messages: Message[];
  private newMessage: string;

  constructor(
    private authService: AuthService,
    private activeUsersService: ActiveUsersService,
    private conversationService: ConversationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.activeUsersService.subscribe();
    this.activeUsersService.getObservable()
      .subscribe(users => this.users = users);

    this.conversationService.subscribe(1);
    this.conversationService.getObservable()
      .subscribe(conversation => this.conversation = conversation);

    this.messageService.subscribe(1);
    this.messageService.getObservable()
      .subscribe(messages => this.messages = messages);
  }

  ngOnDestroy() {
    this.activeUsersService.unsubscribe();
    this.conversationService.unsubscribe();
    this.messageService.unsubscribe();
  }

  private addUser(user: User) {
    this.conversation.members.push(user);
    this.conversationService.updateConversation(this.conversation);
  }

  private removeUser(user: User) {
    let usernames: string[] = this.conversation.members.map(u => u.username);
    let index = usernames.indexOf(user.username);
    this.conversation.members.splice(index, 1);
    this.conversationService.updateConversation(this.conversation);
  }

  private send(): void {
    let msg = new Message();
    msg.id = null;
    msg.author = null;
    msg.sentAt = null;
    msg.content = this.newMessage;
    
    this.messageService.sendMessage(this.conversation.id, msg)
    this.newMessage = "";
  }

  private canBeAdded(username: string): boolean {
    let usernames: string[] = this.conversation.members.map(u => u.username);
    return !usernames.includes(username);
  }
}
