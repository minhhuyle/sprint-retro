import { Component, Input, OnInit } from '@angular/core';
import { PostIt } from '../../model/post-it.model';

@Component({
  selector: 'mle-post-it-on-board',
  templateUrl: './post-it-on-board.component.html',
  styleUrls: ['./post-it-on-board.component.scss']
})
export class PostItOnBoardComponent implements OnInit {
  @Input()
  postIt: PostIt;

  constructor() { }

  ngOnInit() {
  }

}
