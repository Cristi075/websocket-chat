import { Injectable } from '@angular/core';

import { AuthService } from '../service/auth.service';

import { Subject } from 'rxjs/Subject';

import * as Stomp from '@stomp/stompjs';

export enum ConnectionState {
  CONNECTED,
  DISCONNECTED
}

@Injectable()
export class StompService {

  private url = "ws:localhost:8080/chat/echo";
  private subscriptions: Map<string, any> = new Map<string, any>();
  private client: Stomp.Client;
  private headers;

  private state: ConnectionState;
  public stateObservable: Subject<ConnectionState> = new Subject<ConnectionState>();

  constructor(
    private authService: AuthService
  ) {
    this.client = Stomp.client(this.url);

    this.client.heartbeat.incoming = 5000;
    this.client.heartbeat.outgoing = 5000;

    this.client.debug = this.debug;

    if (this.authService.isAuthenticated) {
      this.connect();
    }

    this.authService.getAuthenticationObservable()
      .subscribe(
      authenticated => {
        if (authenticated == true) {
          this.connect();
        } else {
          this.disconnect();
        }
      }
      );

  }

  public connect(): void {
    let headers = {
      login: this.authService.getName(),
      Authorization: this.authService.getToken()
    };

    this.client.connect(
      headers,
      this.on_connect,
      this.on_error
    );
  }

  public disconnect(): void {
    this.client.disconnect(this.on_disconnect);
  }

  public publish(queueName: string, message: string) {
    this.headers = new Headers({ 'user': this.authService.getName() });
    this.client.send(queueName, this.headers, message);
  }

  public subscribe(queueName: string, callback): void {
    if (this.state == ConnectionState.CONNECTED) {
      let subscription = this.client.subscribe(queueName, callback);
      this.subscriptions.set(queueName, subscription);
    } else {
      this.stateObservable.asObservable().takeWhile(
        s => s != ConnectionState.DISCONNECTED
      ).subscribe(
        s => {
          let subscription = this.client.subscribe(queueName, callback);
          this.subscriptions.set(queueName, subscription);
        })
    }
  }

  public unsubscribe(queueName: string) {
    if (this.subscriptions.get(queueName))
      this.subscriptions.get(queueName).unsubscribe({});
  }

  private on_error = (error: string | Stomp.Message) => {

    if (typeof error === 'object') {
      error = (<Stomp.Message>error).body;
    }

    this.debug(`Error: ${error}`);

  }

  private on_disconnect = () => {
    this.debug('Disconnected');
    this.state = ConnectionState.DISCONNECTED;
    this.stateObservable.next(ConnectionState.DISCONNECTED);
  }

  private on_connect = () => {
    this.debug('Connected');
    this.state = ConnectionState.CONNECTED;
    this.stateObservable.next(ConnectionState.CONNECTED);
  }

  private debug = (args: any): void => {
    //console.log(new Date(), args);
  }

}
