import { Component, OnInit } from '@angular/core';
import { AdminViewService } from './admin-view.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Board } from './model/board.model';

@Component({
  selector: 'mle-admin-view',
  templateUrl: './admin-view.component.html',
  styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent implements OnInit {
  isLogged: boolean = false;
  adminForm: FormGroup;
  boards: Board[] = [];

  constructor(private adminViewService: AdminViewService, private formBuilder: FormBuilder) {
    this.adminForm =  this.formBuilder.group({
      "password": ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.adminViewService.connect().subscribe(value => {});
  }

  onAuthentication() {
    this.adminViewService.authentication(this.adminForm.value).subscribe(boardsResponse => {
      this.boards = boardsResponse;
      this.isLogged = true;
    })
  }

  reset() {
    this.adminViewService.reset(this.adminForm.value).subscribe(() => {})
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
      password: this.adminForm.value.password,
      boards: this.boards
    }).subscribe(boardsResponse => {
      this.boards = boardsResponse;
    })
  }

  deleteBoard(boardId: number, index: number) {
    this.boards.splice(index, 1);
    if(boardId >= 0) {
      this.adminViewService.deleteBoard({
        password: this.adminForm.value.password,
        boardId
      }).subscribe(() => {});
    }
  }
}
