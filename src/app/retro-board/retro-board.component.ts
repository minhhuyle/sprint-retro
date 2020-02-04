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
  private maxVote = 3;
  private export :boolean = false;

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
    let result = this.postIts && this.postIts[type] ? this.postIts[type] : [];
    return result.sort((postItA, postItB) => {return postItB.vote - postItA.vote});
  }

  refresh() {
    this.loadPostIts();
  }

  voteUpPostIt(type: PostItType, id: string) {
    if(this.maxVote) {
      this.maxVote--;
      this.http.post('/vote', {type, id}).subscribe(() => {});
    }
  }

  exportLowCost() {
    this.export = !this.export;
  }
}
