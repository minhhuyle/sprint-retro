import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostIt, PostItType } from '../model/post-it.model';
import { SocketService } from '../../socket/socket.service';
import { SocketMessageType } from '../../socket/socket.model';
import { environment } from '../../../environments/environment';
import { BoardService } from '../board.service';
import { Board } from '../model/board.model';
import { UserService } from '../../user/login/user.service';
import { Theme } from '../../admin-view/model/theme.model';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'mle-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit, OnDestroy {
  public postIts;
  private export: boolean = false;
  private selectedPostItWantedToLink: PostIt;
  boards: Board[];
  private theme: Theme;
  voteRemaining: number[] = [];
  searchValue: string;

  constructor(private http: HttpClient,
              private boardService: BoardService,
              private socketService: SocketService,
              private userService: UserService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(response => this.handleResult(response));
    this.initData();
    this.loadPostIts();
  }

  private initData() {
    this.themeService.getActivatedTheme().subscribe(theme => {
      this.theme = theme;
      this.computeVoteRemaining();
    });
    this.boardService.getAllBoards().subscribe(boardsRes => {
      this.boards = boardsRes;
      this.loadPostIts();
    });
  }

  ngOnDestroy(): void {
    this.socketService.cancelHandleMessage();
  }

  loadPostIts( postItType ?: PostItType) {
    this.http.get(environment.apiUrl + '/post-its').subscribe((response) => {
      if(postItType && this.postIts) {
        this.postIts[postItType].length = 0;
      }
      this.postIts = response;
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
    this.loadPostIts(postItType);
  }

  voteUpPostIt(type: string, postItId: number) {
    if (this.voteRemaining?.length > 0) {
      this.http.post(environment.apiUrl + '/vote', {user: {
        userName: this.userService.getUser().userName,
        password: this.userService.getUser().password,
        }, postItId}).subscribe(user => {
          this.userService.setLoggedUser(user);
          this.computeVoteRemaining();
      });
    }
  }

  exportLowCost() {
    this.export = !this.export;
  }

  handleResult(response): void {
    const rawMessage = response.body;
    if(!!rawMessage) {
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
      this.loadPostIts();
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
    }).subscribe(() => {
      //this.postIts = response;
    });
  }

  isAllowedToLinkPostIt() {
    return this.userService.getUser().role === 'ADMIN';
  }

  computeVoteRemaining() {
    if(this.theme) {
      const remaining = this.theme.maxVote - this.userService.getUser().totalVotedPostIts;
      this.voteRemaining = Array.from(Array(remaining).keys());
    }
  }

  isNotViewer() {
    return this.userService.getUser().role !== 'VIEWER';
  }
}
