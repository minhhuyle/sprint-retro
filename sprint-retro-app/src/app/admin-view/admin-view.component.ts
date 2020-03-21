import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { Board } from './model/board.model';
import { UserService } from '../user/login/user.service';
import { Theme } from './model/theme.model';

@Component({
  selector: 'mle-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  boards: Board[] = [];
  themes: Theme[] = [];

  constructor(private adminViewService: AdminViewService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.getBoards();
    this.getThemes();
  }

  private getAdminAuth() {
     const {userName, password} = this.userService.getUser();
    return {userName, password};
  }

  getBoards() {
    this.adminViewService.authentication(this.getAdminAuth()).subscribe(boardsResponse => {
      this.boards = boardsResponse;
    })
  }

  getThemes() {
    this.adminViewService.getThemes(this.getAdminAuth()).subscribe(themes => {
      this.themes = themes;
    })
  }

  reset() {
    this.adminViewService.reset(this.getAdminAuth()).subscribe(() => {})
  }

  addBoard() {
    this.boards.push(new Board());
  }

  disableActiveLikable(board: Board) {
    board.likable = !board.likable;
  }

  getClassOfLikable(likable: boolean) {
    return likable ? 'fa-thumbs-up' : 'fa-thumbs-down';
  }

  saveBoards() {
    this.adminViewService.saveBoard({
      user: this.getAdminAuth(),
      boards: this.boards
    }).subscribe(boardsResponse => {
      this.boards = boardsResponse;
    })
  }

  deleteBoard(boardId: number, index: number) {
    this.boards.splice(index, 1);
    if(boardId >= 0) {
      this.adminViewService.deleteBoard({
        user: this.getAdminAuth(),
        boardId
      }).subscribe(() => {});
    }
  }

  addTheme() {
    this.themes.push(new Theme());
  }

  saveThemes() {
    this.adminViewService.saveThemes({
      user: this.getAdminAuth(),
      themes: this.themes
    }).subscribe(themes => {
      this.themes = themes;
    })
  }

  startWriteBoard(themeId: number) {
    this.adminViewService.startWriteBoardTheme({
      user: this.getAdminAuth(),
      themeId: themeId
    }).subscribe( () => {
    })
  }
}
