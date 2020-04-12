import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Subscription, timer } from 'rxjs';
import { BrowserStorageService } from '../../service/storage/browser-storage.service';
import { SocketService } from '../../service/socket/socket.service';
import { ThemeService } from '../../service/theme/theme.service';
import { SocketMessageType } from '../../service/socket/socket.model';
import { PostIt, Theme } from '../../service/theme/theme.model';


@Component({
  selector: 'mle-write-board-scene',
  templateUrl: './write-board-scene.component.html',
  styleUrls: ['./write-board-scene.component.scss']
})
export class WriteBoardSceneComponent implements OnInit, OnDestroy {

  lockBoard :boolean = true;
  theme: Theme;
  timerSub: Subscription;
  postItsRemaining: number[] = [];
  private postItComments;
  private timeToDisplay;

  constructor(private browserStorageService: BrowserStorageService,
              private socketService: SocketService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(response => this.handleResult(response));
    this.initData();
  }

  ngOnDestroy(): void {
    if(this.timerSub) {
      this.timerSub.unsubscribe();
    }
  }

  private initData() {
    this.themeService.getActivatedTheme().subscribe(theme => {
      this.handleInitTheme(theme);
    })
  }

  private initLocalPostItData() {
    const postItsContainer = this.browserStorageService.getPostItsContainer();
    if(postItsContainer) {

      this.postItComments = postItsContainer;
      this.theme.boards.forEach(ele => {
        if(!this.postItComments[ele.type]) {
          this.postItComments[ele.type] = [];
        }
      })
    } else {
      this.postItComments = {};
      this.theme.boards.forEach(ele => this.postItComments[ele.type] = [])
    }
  }

  addPostItComment(type) {
    this.postItComments[type].unshift(new PostIt(type));
    this.saveLocalPostIt();
    this.computeNumberOfRemainingPostIt();
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
      this.computeNumberOfRemainingPostIt();
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
        case SocketMessageType.REFRESH_THEME:
        case SocketMessageType.WRITE_BOARD_START:
        case SocketMessageType.WRITE_BOARD_STOP:
          this.handleInitTheme(message.data);
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
      this.initLocalPostItData();
      this.computeNumberOfRemainingPostIt();
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

  computeNumberOfRemainingPostIt() {
    if(this.theme?.boards) {
      const remaining = this.theme.maxPostIt - this.getNumberOfPostIts();
      this.postItsRemaining = Array.from(Array(remaining).keys());
    }
  }

  canAddNewPostIt(): boolean {
    const numberOfPostIts = this.getNumberOfPostIts();
    return this.theme ? this.theme.maxPostIt > numberOfPostIts : false;
  }

  private getNumberOfPostIts() {
    let result = 0;
    if(this.postItComments && this.theme?.boards) {
      this.theme.boards.forEach(board => result += this.postItComments[board.type].length);
    }

    return result;
  }

  canWriteInLimitTime() {
    return (this.timeToDisplay > 0);
  }

  saveLocalPostIt() {
    this.browserStorageService.setPostItsContainer(this.postItComments);
  }
}
