import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostIt, PostItType } from './post-it/post-it.model';

@Component({
  selector: 'mle-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

  private postItComments;

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.postItComments = {};
    Object.values(PostItType).forEach(ele => this.postItComments[ele] = [])
  }

  addPostItComment(type: PostItType) {
    this.postItComments[type].unshift(new PostIt(type));
  }

  getPostItComments(type: PostItType): [PostIt] {
    return this.postItComments[type];
  }

  removePostIt(postIt: PostIt) {
    const type = postIt.type;
    const findIndex = this.getPostItComments(type).findIndex(val => val == postIt);
    if(findIndex != -1) {
      this.getPostItComments(type).splice(findIndex, 1);
    }
  }

}
