import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from './model/board.model';
import { UserService } from '../user/login/user.service';

@Component({
  selector: 'mle-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  boards: Board[] = [];

  constructor(private adminViewService: AdminViewService, private userService: UserService) {

  }

  ngOnInit(): void {
    this.getBoards();
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
}
