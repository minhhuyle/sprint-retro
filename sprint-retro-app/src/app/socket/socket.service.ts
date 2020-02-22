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

  constructor(private http: HttpClient) { }

  post(data) {
    return this.http.post(this.serverUrl, data).pipe(
      map((data) => { return data; })
    );
  }

  initializeWebSocketConnection(handleMessage: (message) => void) {
    if(this.stompClient) {
      return;
    }

    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.openGlobalSocket(handleMessage)
    });
  }

  private openGlobalSocket(handleMessage: (message) => void) {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      console.log(message);
      handleMessage(message);
    });
  }
}
