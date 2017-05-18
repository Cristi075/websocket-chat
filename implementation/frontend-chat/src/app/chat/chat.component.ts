import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { DialogService } from "ng2-bootstrap-modal";
import { InfoComponent } from '../dialogs/info/info.component';
import { InputComponent } from '../dialogs/input/input.component';

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
export class ChatComponent implements OnInit, OnDestroy {

  private users: User[];
  private conversation: Conversation;
  private messages: Message[];
  private newMessage: string = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogService: DialogService,
    private activeUsersService: ActiveUsersService,
    private conversationService: ConversationService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];

      this.activeUsersService.subscribe();
      this.activeUsersService.getObservable()
        .subscribe(users => this.users = users);

      this.conversationService.subscribe(id);
      this.conversationService.getObservable()
        .subscribe(conversation => this.conversation = conversation);

      this.messageService.subscribe(id);
      this.messageService.getObservable()
        .subscribe(messages => this.messages = messages);
    });
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
    this.newMessage = null;
  }

  private canBeAdded(username: string): boolean {
    let usernames: string[] = this.conversation.members.map(u => u.username);
    return !usernames.includes(username);
  }

  private rename(): void{
    this.dialogService.addDialog(
      InputComponent,
      {
        title: "Enter the new name",
        placeholder: "New name",
        type: "text"
      }
    ).subscribe(userInput => {
      if (userInput == null) {
        this.showMessage("Canceled", "Operation canceled by user", false);
      } else {
        this.conversation.name = userInput;
        this.conversationService.updateConversation(this.conversation);
      }
    });
  }

  showMessage(title: string, message: string, success: boolean): void {
    this.dialogService.addDialog(
      InfoComponent,
      {
        title: title,
        message: message,
        success: success
      }
    );
  }
}
