import { Component, OnInit } from '@angular/core';
import { BrowserStorageServiceService } from '../../storage/browser-storage-service.service';
import { PostIt } from '../model/post-it.model';
import { BoardService } from '../board.service';
import { Board } from '../model/board.model';

@Component({
  selector: 'mle-write-board',
  templateUrl: './write-board.component.html',
  styleUrls: ['./write-board.component.scss']
})
export class WriteBoardComponent implements OnInit {

  private postItComments;
  private lockBoard :boolean = true;
  private boards: Board[];

  constructor(private boardService: BoardService, private browserStorageServiceService: BrowserStorageServiceService) {

  }

  ngOnInit() {
    this.initData();
  }

  private initData() {
    this.boardService.getAllBoards().subscribe(boardsRes => {
      this.boards = boardsRes;
      this.initLocalPostItData();
    });
  }

  private initLocalPostItData() {
    const localData = this.browserStorageServiceService.getLocal();
    if(localData) {
      this.postItComments = localData;
      this.boards.forEach(ele => {
        if(!this.postItComments[ele.type]) {
          this.postItComments[ele.type] = [];
        }
      })
    } else {
      this.postItComments = {};
      this.boards.forEach(ele => this.postItComments[ele.type] = [])
    }
  }

  addPostItComment(type) {
    this.postItComments[type].unshift(new PostIt(type));
    this.browserStorageServiceService.setLocal(this.postItComments);
  }

  getPostItComments(type: string): PostIt[] {
    return this.postItComments ? this.postItComments[type] : [];
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
