import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';

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

import * as FileSaver from 'file-saver';

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
  private uploader: FileUploader = new FileUploader({});
  private reader: FileReader = new FileReader();

  private users: User[];
  private conversation: Conversation;
  private messages: Message[];
  private newMessage: string = null;

  private fileData: string;
  private fileItem: File;

  private imgTypes: string[] = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif"
  ];

  private maxSize: number = 1024 * 1024;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private dialogService: DialogService,
    private activeUsersService: ActiveUsersService,
    private conversationService: ConversationService,
    private messageService: MessageService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {

    this.reader.onload = (ev: any) => {
      let binary = ev.target.result;
      this.fileData = binary;
    };
    this.uploader.onAfterAddingFile = (fileItem: any) => {
      this.fileItem = fileItem._file;
      this.reader.readAsDataURL(fileItem._file);
    };

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

  private sendImage(): void {
    if (!this.imgTypes.includes(this.fileItem.type)) {
      this.showMessage("ERROR", "The selected file format is not allowed", false);
      return;
    }

    if (this.fileItem.size > this.maxSize) {
      this.showMessage("ERROR", "The selected file is too large", false);
      return;
    }

    this.messageService.sendImageMessage(this.conversation.id, this.fileData);
    this.fileData = null;
    this.fileItem = null;
    this.uploader.clearQueue();
  }

  private sendFile(): void {
    if (this.fileItem.size > this.maxSize) {
      this.showMessage("ERROR", "The selected file is too large", false);
      return;
    }

    this.messageService.sendFileMessage(this.conversation.id, this.fileData, this.fileItem.name);
    this.fileData = null;
    this.fileItem = null;
    this.uploader.clearQueue();
  }

  private download(msg: Message) {
    let type: string = msg.file.substring(0, msg.file.indexOf(',') + 1);
    type = type.substring(5, type.length - 8);
    let data = msg.file.substring(msg.file.indexOf(',') + 1);

    console.log(type);
    FileSaver.saveAs(this.b64toBlob(data, type), msg.fileName);
  }

  private b64toBlob(b64Data, contentType) {
    var sliceSize = 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }

  private rename(): void {
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

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }


}
