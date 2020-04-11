import { Component, Input, OnInit } from '@angular/core';
import { PostIt, Theme } from '../../../service/theme/theme.model';

@Component({
  selector: 'mle-export-boards',
  templateUrl: './export-boards.component.html',
  styleUrls: ['./export-boards.component.scss']
})
export class ExportBoardsComponent implements OnInit {

  @Input()
  postIts;

  @Input()
  theme: Theme;

  constructor() { }

  ngOnInit(): void {
  }

  getPostItComments(type: string) : PostIt[] {
    let result = this.postIts && this.postIts[type] ? this.postIts[type] : [];
    return result.sort((postItA, postItB) => {
      return postItB.vote - postItA.vote;
    });
  }

}
