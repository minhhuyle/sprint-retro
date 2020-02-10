import { Component, OnInit } from '@angular/core';
import { PostIt, PostItType } from '../post-it/post-it.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'mle-point-of-view',
  templateUrl: './point-of-view.component.html',
  styleUrls: ['./point-of-view.component.scss']
})
export class PointOfViewComponent implements OnInit {

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
    this.postItComments[type].push(new PostIt(type));
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
