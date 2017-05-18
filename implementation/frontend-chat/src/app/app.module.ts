import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Angular2AutoScroll } from "angular2-auto-scroll/lib/angular2-auto-scroll.directive";

import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';

import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { InfoComponent } from './dialogs/info/info.component';
import { InputComponent } from './dialogs/input/input.component';

import { AuthService } from './service/auth.service';
import { HttpService } from './service/http.service';
import { StompService } from './service/stomp.service';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { ActiveUserListComponent } from './user/active-user-list/active-user-list.component';
import { ChatComponent } from './chat/chat.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    ConfirmComponent,
    InfoComponent,
    InputComponent,
    UserListComponent,
    UserAddComponent,
    UserDetailComponent,
    UserFormComponent,
    ActiveUserListComponent,
    ChatComponent,
    Angular2AutoScroll,
    ConversationListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BootstrapModalModule
  ],
  providers: [
    AuthService,
    HttpService,
    StompService
  ],
  entryComponents: [
    ConfirmComponent,
    InfoComponent,
    InputComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
