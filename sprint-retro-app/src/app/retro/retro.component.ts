import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SocketService } from '../socket/socket.service';
import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { environment } from '../../environments/environment';
import { RetroBoardComponent } from './retro-board/retro-board.component';

@Component({
  selector: 'mle-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

  @ViewChild(RetroBoardComponent)
  private retroBoardComponent: RetroBoardComponent;

  private serverUrl = environment.apiUrl + '/socket';
  private stompClient;

  constructor() { }

  ngOnInit() {
    this.initializeWebSocketConnection();
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.serverUrl);
    this.stompClient = Stomp.over(ws);
    let that = this;
    this.stompClient.connect({}, function (frame) {
      that.openGlobalSocket()
    });
  }

  openGlobalSocket() {
    this.stompClient.subscribe("/socket-publisher", (message) => {
      this.handleResult(message);
    });
  }

  handleResult(message){
    if (message.body) {
      let postIt = JSON.parse(message.body);
      this.retroBoardComponent.notifyPostItOnBoard(postIt);
      /*this.toastr.success("new message recieved", null, {
        'timeOut': 3000
      });*/
    }
  }

}
