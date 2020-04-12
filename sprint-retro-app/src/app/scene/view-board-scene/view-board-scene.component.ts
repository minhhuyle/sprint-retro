import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { PostIt, Theme } from '../../service/theme/theme.model';
import { SocketService } from '../../service/socket/socket.service';
import { UserService } from '../../service/user/user.service';
import { ThemeService } from '../../service/theme/theme.service';
import { environment } from '../../../environments/environment';
import { SocketMessageType } from '../../service/socket/socket.model';

@Component({
  selector: 'mle-view-board-scene',
  templateUrl: './view-board-scene.component.html',
  styleUrls: ['./view-board-scene.component.scss']
})
export class ViewBoardSceneComponent implements OnInit, OnDestroy {
  public postIts;
  export: boolean = false;
  private selectedPostItWantedToLink: PostIt;
  theme: Theme;
  voteRemaining: number[] = [];
  searchValue: string;
  private togglePostItsSort: boolean = false;

  private searchModelChanged: Subject<string> = new Subject<string>();

  private subs: Subscription[] = [];
  private postItsSearch: PostIt[] = null;
  private postItIdChildToLink: number[] = [];

  constructor(private http: HttpClient,
              private socketService: SocketService,
              private userService: UserService,
              private themeService: ThemeService) {
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(response => this.handleResult(response));
    this.initData();
    this.loadPostIts();
    this.subs.push(this.subscribeForSearchIssues());
  }

  private subscribeForSearchIssues() : Subscription {
    return this.searchModelChanged
      .pipe(
        debounceTime(1000))
      .subscribe(() => {
        if(this.searchValue?.length > 0) {
          const searchVal = this.searchValue.toUpperCase();
          const result = [];
          this.getPostItComments(this.getPostItLinkType()).forEach(postIt => {
            if(postIt.comment?.toUpperCase().includes(searchVal)) {
              result.push(postIt);
            }
          });
          this.postItsSearch = result;
        } else {
          this.postItsSearch = null;
        }
      });
  }

  private initData() {
    this.themeService.getActivatedTheme().subscribe(theme => {
      this.loadTheme(theme);
    });
  }

  private loadTheme(theme: Theme) {
    this.theme = theme;
    this.computeVoteRemaining();
    this.loadPostIts();
  }

  ngOnDestroy(): void {
    this.socketService.cancelHandleMessage();
    if(this.subs) {
      this.subs.forEach(subscription => subscription.unsubscribe());
    }
  }

  loadPostIts( postItType ?: string) {
    this.http.get(environment.apiUrl + '/post-its').subscribe((response) => {
      if(postItType && this.postIts) {
        this.postIts[postItType].length = 0;
      }
      this.postIts = response;
    });
  }

  getPostItComments(type: string) : PostIt[] {
    let result = this.postIts && this.postIts[type] ? this.postIts[type] : [];

    if(this.togglePostItsSort) {
      return [...result].sort((postItA, postItB) => {
        return postItB.vote - postItA.vote;
      });
    }

    return result;
  }

  refresh(postItType?: string) {
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
        case SocketMessageType.RESET_VOTES:
          this.loadPostIts();
          this.userService.reloadUser().subscribe(user => {
            this.userService.setLoggedUser(user);
            this.computeVoteRemaining();
          });
          break;
        case SocketMessageType.REFRESH_VOTE:
          this.loadPostIts();
          break;
        case SocketMessageType.REFRESH_THEME:
          this.loadTheme(message.data);
          break;
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
    this.searchValue = "";
    this.postItsSearch = null;
    this.postItIdChildToLink = [];
  }

  getSelectedPostItWantedToLink() {
    return this.selectedPostItWantedToLink;
  }

  getPostItToLink(): PostIt[] {
    if(this.postItsSearch?.length >= 0) {
      return this.postItsSearch;
    }

    return this.getPostItComments(this.getPostItLinkType());
  }

  getPostItLinkType(): string {
    return this.selectedPostItWantedToLink?.type;
  }

  linkToParent() {
    this.http.post(environment.apiUrl + '/link-post', {
      childIds: this.postItIdChildToLink,
      parentId: this.selectedPostItWantedToLink.id
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
      this.voteRemaining = remaining > 0 ? Array.from(Array(remaining).keys()) : [];
    }
  }

  isNotViewer() {
    return this.userService.getUser().role !== 'VIEWER';
  }

  searchForLink() {
    this.searchModelChanged.next();
  }

  selectLinkToParent(postIt: PostIt) {
    const indexToRemove = this.postItIdChildToLink.indexOf(postIt.id);
    if(indexToRemove > -1) {
      this.postItIdChildToLink.splice(indexToRemove, 1);
    } else {
      this.postItIdChildToLink.push(postIt.id);
    }
  }

  togglePostItsSorted() {
    this.togglePostItsSort = !this.togglePostItsSort;
  }
}
