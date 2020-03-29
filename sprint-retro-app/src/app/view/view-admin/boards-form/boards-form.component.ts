import { Component, Input, OnInit } from '@angular/core';
import { Board, Theme } from '../../../service/theme/theme.model';

@Component({
  selector: 'mle-boards-form',
  templateUrl: './boards-form.component.html',
  styleUrls: ['./boards-form.component.scss']
})
export class BoardsFormComponent implements OnInit {
  @Input()
  theme: Theme;

  constructor() { }

  ngOnInit(): void {
  }

  addBoard() {
    this.theme.boards.push(new Board());
  }

  disableActiveLikable(board: Board) {
    board.likable = !board.likable;
  }

  getClassOfLikable(likable: boolean) {
    return likable ? 'fa-thumbs-up' : 'fa-thumbs-down';
  }

}
