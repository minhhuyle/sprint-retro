import { Component, OnDestroy, OnInit } from '@angular/core';
import { BrowserStorageService } from '../../storage/browser-storage.service';
import { PostIt } from '../model/post-it.model';
import { BoardService } from '../board.service';
import { Board } from '../model/board.model';
import { SocketService } from '../../socket/socket.service';
import { SocketMessageType } from '../../socket/socket.model';
import { Theme } from '../../admin-view/model/theme.model';
import { ThemeService } from '../theme.service';
import * as moment from 'moment';
import { Observable, Subscription, timer } from 'rxjs';

@Component({
  selector: 'mle-write-board',
  templateUrl: './write-board.component.html',
  styleUrls: ['./write-board.component.scss']
})
export class WriteBoardComponent implements OnInit, OnDestroy {

  private postItComments;
  private lockBoard :boolean = true;
  private boards: Board[];
  private theme: Theme;
  private timeToDisplay;
  timerSub: Subscription;

  constructor(private boardService: BoardService,
              private browserStorageService: BrowserStorageService,
              private socketService: SocketService,
              private themeService: ThemeService) {
  }

  ngOnDestroy(): void {
    if(this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(response => this.handleResult(response));
    this.initData();
  }

  private initData() {
    this.themeService.getActivatedTheme().subscribe(theme => {
      this.handleInitTheme(theme);
      this.initBoard();
    })
  }

  private initBoard() {
    this.boardService.getAllBoards().subscribe(boardsRes => {
      this.boards = boardsRes;
      this.initLocalPostItData();
    });
  }

  private initLocalPostItData() {
    const postItsContainer = this.browserStorageService.getPostItsContainer();
    if(postItsContainer) {
      this.postItComments = postItsContainer;
      this.boards.forEach(ele => {
        if(!this.postItComments[ele.type]) {
          this.postItComments[ele.type] = [];
        }
      })
    } else {
      this.postItComments = {};
      this.boards.forEach(ele => this.postItComments[ele.type] = [])
    }
  }

  addPostItComment(type) {
    this.postItComments[type].unshift(new PostIt(type));
    this.browserStorageService.setPostItsContainer(this.postItComments);
  }

  getPostItComments(type: string): PostIt[] {
    return this.postItComments ? this.postItComments[type] : [];
  }

  removePostIt(postIt: PostIt) {
    const type = postIt.type;
    const findIndex = this.getPostItComments(type).findIndex(val => val == postIt);
    if(findIndex != -1) {
      this.getPostItComments(type).splice(findIndex, 1);
      this.browserStorageService.setPostItsContainer(this.postItComments);
    }
  }

  lockUnLockBoard() {
    this.lockBoard = !this.lockBoard;
  }

  getLockClass() {
    return (this.lockBoard) ? "btn-warning fa-lock" : "btn-success fa-unlock";
  }

  handleResult(response): void {
    const rawMessage = response.body;
    if(!!rawMessage) {
      const message = JSON.parse(rawMessage);
      switch (message.type as SocketMessageType) {
        case SocketMessageType.WRITE_BOARD:
          this.handleInitTheme(message.data);
          this.initBoard();
          break;
      }
    }
  }

  handleInitTheme(theme: Theme) {
    this.theme = theme;
    if(this.theme) {
      this.timeToDisplay = (this.theme.limitTimeToWrite * 60) - moment().diff(moment.utc(this.theme.writeTime), 'seconds');
      if(this.timeToDisplay > 0) {
        if(this.timerSub) {
          this.timerSub.unsubscribe();
          this.timerSub = null;
        }
        this.timerSub = timer(1000, 1000).subscribe(t => {
          if(this.timeToDisplay > 0) {
            this.timeToDisplay--;
          } else {
            this.timerSub.unsubscribe();
            this.timerSub = null;
          }
        });
      }
    }
  }

  displayTimer() {
    if(this.timeToDisplay > 0 ){
      let result = '';
      const remainder = this.timeToDisplay%60;
      const minute = (this.timeToDisplay - remainder)/60;
      if(minute > 0 ){
        result += minute + 'm';
      }

      result += remainder + 's';

      return result;
    }

    return " -- ";
  }

  isCanWriteInLimitTime() {
    return (this.timeToDisplay > 0);
  }
}
