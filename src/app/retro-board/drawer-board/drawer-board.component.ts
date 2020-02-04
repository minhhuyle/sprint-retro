import { Component, Input, OnInit } from '@angular/core';
import { PostItType } from '../../post-it/post-it.model';

@Component({
  selector: 'mle-drawer-board',
  templateUrl: './drawer-board.component.html',
  styleUrls: ['./drawer-board.component.scss']
})
export class DrawerBoardComponent implements OnInit {
  @Input()
  type: PostItType;

  @Input()
  postIts: [];

  constructor() { }

  ngOnInit() {
  }
}
