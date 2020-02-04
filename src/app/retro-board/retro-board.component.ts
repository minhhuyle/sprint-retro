import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostItType } from '../post-it/post-it.model';

@Component({
  selector: 'mle-retro-board',
  templateUrl: './retro-board.component.html',
  styleUrls: ['./retro-board.component.scss']
})
export class RetroBoardComponent implements OnInit {

  private postIts;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.loadPostIts();
  }

  loadPostIts() {
    this.http.get('/post-its').subscribe(response => {
      this.postIts = response;
    });
  }

  getPostItComments(type: PostItType) {
    return this.postIts && this.postIts[type] ? this.postIts[type] : [];
  }

  refresh() {
    this.loadPostIts();
  }

  voteUpPostIt(id: string) {

  }

  removeVotePostIt(id: string) {

  }
}
