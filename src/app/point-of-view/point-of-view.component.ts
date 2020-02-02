import { Component, OnInit } from '@angular/core';
import { PostIt, PostItType } from '../post-it/post-it.model';

@Component({
  selector: 'mle-point-of-view',
  templateUrl: './point-of-view.component.html',
  styleUrls: ['./point-of-view.component.scss']
})
export class PointOfViewComponent implements OnInit {

  private postIts;

  constructor() {

  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.postIts = {};
    Object.values(PostItType).forEach(ele => this.postIts[ele] = [])
  }

  addPostIt(type: PostItType) {
    this.postIts[type].push(new PostIt());
  }

  getPostIts(type: PostItType) {
    return this.postIts[type];
  }
}
