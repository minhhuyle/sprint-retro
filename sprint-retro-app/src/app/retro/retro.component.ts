import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PostIt, PostItType } from './post-it/post-it.model';
import { BrowserStorageServiceService } from '../storage/browser-storage-service.service';

@Component({
  selector: 'mle-retro',
  templateUrl: './retro.component.html',
  styleUrls: ['./retro.component.scss']
})
export class RetroComponent implements OnInit {

  private postItComments;
  private lockBoard :boolean = true;

  constructor(private http: HttpClient, private browserStorageServiceService: BrowserStorageServiceService) {

  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    const localData = this.browserStorageServiceService.getLocal();
    if(localData) {
      this.postItComments = localData;
    } else {
      this.postItComments = {};
      Object.values(PostItType).forEach(ele => this.postItComments[ele] = [])
    }
  }

  addPostItComment(type: PostItType) {
    this.postItComments[type].unshift(new PostIt(type));
    this.browserStorageServiceService.setLocal(this.postItComments);
  }

  getPostItComments(type: PostItType): [PostIt] {
    return this.postItComments[type];
  }

  removePostIt(postIt: PostIt) {
    const type = postIt.type;
    const findIndex = this.getPostItComments(type).findIndex(val => val == postIt);
    if(findIndex != -1) {
      this.getPostItComments(type).splice(findIndex, 1);
      this.browserStorageServiceService.setLocal(this.postItComments);
    }
  }

  lockUnLockBoard() {
    this.lockBoard = !this.lockBoard;
  }

  getLockClass() {
    return (this.lockBoard) ? "btn-warning fa-lock" : "btn-success fa-unlock";
  }
}
