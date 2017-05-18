import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';

import { ActiveUserListComponent } from './user/active-user-list/active-user-list.component';

import { ChatComponent } from './chat/chat.component';

import { ConversationListComponent } from './conversation-list/conversation-list.component';

const routes: Routes = [
  {
    path: '',
    children: []
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'chat/:id',
    component: ChatComponent
  },
  {
    path: 'conversations',
    component: ConversationListComponent
  },
  {
    path: 'user',
    children: [
      { path: 'list', component: UserListComponent },
      { path: 'add', component: UserAddComponent },
      { path: 'detail/:id', component: UserDetailComponent },
      { path: 'active', component: ActiveUserListComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
