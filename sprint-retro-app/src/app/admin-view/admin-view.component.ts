import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { UserService } from '../user/login/user.service';
import { Board, Theme } from '../board/model/theme.model';

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
    this.adminViewService.getThemes().subscribe(themes => {
      this.themes = themes;
    })
  }

  reset() {
    this.adminViewService.reset(this.getAdminAuth()).subscribe(() => {})
  }

  addTheme() {
    this.themes.push(new Theme());
  }
}
