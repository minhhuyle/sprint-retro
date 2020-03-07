import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private serverUrl = environment.apiUrl + '/socket';
  private stompClient;
  private handleMessage: (message) => void;

  constructor(private http: HttpClient) { }

  post(data) {
    return this.http.post(this.serverUrl, data).pipe(
      map((data) => { return data; })
    );
  }

  initializeWebSocketConnection(handleMessage: (response) => void) {
    this.handleMessage = handleMessage;
    if(this.stompClient) {
      return;
    }

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, (frame) => {
      that.openGlobalSocket()
    });
  }

  private openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (response) => {
      this.handleMessage && this.handleMessage(response);
    });
  }

  cancelHandleMessage() {
    this.handleMessage = null;
  }
}
