import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostIt, PostItType } from '../model/post-it.model';
import { SocketService } from '../../socket/socket.service';
import { SocketMessageType } from '../../socket/socket.model';
import { environment } from '../../../environments/environment';
import { BoardService } from '../board.service';
import { Board } from '../model/board.model';

@Component({
  selector: 'mle-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit, OnDestroy {
  public postIts;
  private maxVote = 3;
  private export: boolean = false;
  private selectedPostItWantedToLink: PostIt;
  boards: Board[];

  constructor(private http: HttpClient,
              private boardService: BoardService,
              private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(response => this.handleResult(this, response));
    this.initData();
    this.loadPostIts(this);
  }

  private initData() {
    this.boardService.getAllBoards().subscribe(boardsRes => {
      this.boards = boardsRes;
      this.loadPostIts(this);
    });
  }

  ngOnDestroy(): void {
    this.socketService.cancelHandleMessage();
  }

  loadPostIts(component: ViewBoardComponent, postItType ?: PostItType) {
    this.http.get(environment.apiUrl + '/post-its').subscribe((response) => {
      if(!component.postIts || !postItType) {
        component.postIts = response;
      } else {
        component.postIts[postItType].length = 0;
      }
    });
  }

  getPostItComments(type: string) : PostIt[] {
    let result = this.postIts && this.postIts[type] ? this.postIts[type] : [];
    return result.sort((postItA, postItB) => {
      return postItB.vote - postItA.vote;
    });
  }

  refresh(postItType?: PostItType) {
    this.selectedPostItWantedToLink = null;
    this.loadPostIts(this, postItType);
  }

  voteUpPostIt(type: string, id: number) {
    if (this.maxVote) {
      this.maxVote--;
      this.http.post(environment.apiUrl + '/vote', {type, id}).subscribe(() => {
      });
    }
  }

  exportLowCost() {
    this.export = !this.export;
  }

  handleResult(component: ViewBoardComponent, response): void {
    const rawMessage = response.body;
    if(rawMessage) {
      const message = JSON.parse(rawMessage);
      switch (message.type as SocketMessageType) {
        case SocketMessageType.REFRESH:
          this.refresh(message.data ? message.data : null);
          break;
        case SocketMessageType.RESET:
          this.refresh();
          break;
        case SocketMessageType.DATA:
          let postIt = message.data;
          this.notifyPostItOnBoard(postIt);
          break;
      }
    }
  }

  notifyPostItOnBoard(postIt: PostIt) {
    if (this.postIts) {
      const findIndex = this.postIts[postIt.type].findIndex(val => val.id == postIt.id);
      if (findIndex != -1) {
        this.postIts[postIt.type][findIndex] = postIt;
      } else {
        this.postIts[postIt.type].unshift(postIt);
      }
    } else {
      this.loadPostIts(this);
    }
  }

  openModalToLink(postIt: PostIt) {
    this.selectedPostItWantedToLink = postIt;
  }

  getSelectedPostItWantedToLink() {
    return this.selectedPostItWantedToLink;
  }

  getPostItToLink(): PostIt[] {
    return this.getPostItComments(this.getPostItLinkType());
  }

  getPostItLinkType(): string {
    return this.selectedPostItWantedToLink?.type;
  }

  linkToParent(parentPostIt: PostIt) {
    this.http.post(environment.apiUrl + '/link-post', {
      childId: this.selectedPostItWantedToLink.id,
      parentId: parentPostIt.id
    }).subscribe(response => {
      this.postIts = response;
    });
  }
}
