import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { PostIt, PostItType } from '../retro/post-it/post-it.model';
import { SocketService } from '../socket/socket.service';

@Component({
  selector: 'mle-view-board',
  templateUrl: './view-board.component.html',
  styleUrls: ['./view-board.component.scss']
})
export class ViewBoardComponent implements OnInit {
  private postIts;
  private maxVote = 3;
  private export :boolean = false;

  constructor(private http: HttpClient, private socketService: SocketService) {
  }

  ngOnInit() {
    this.socketService.initializeWebSocketConnection(message => this.handleResult(message));
    this.loadPostIts();
  }

  loadPostIts() {
    this.http.get(environment.apiUrl + '/post-its').subscribe(response => {
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
      this.http.post(environment.apiUrl + '/vote', {type, id}).subscribe(() => {});
    }
  }

  exportLowCost() {
    this.export = !this.export;
  }

  handleResult(message) : void{
    if (message.body) {
      let postIt = JSON.parse(message.body);
      this.notifyPostItOnBoard(postIt);
    }
  }

  notifyPostItOnBoard(postIt: PostIt) {
    if(this.postIts) {
      const findIndex = this.postIts[postIt.type].findIndex(val => val.id == postIt.id);
      if(findIndex != -1) {
        this.postIts[postIt.type][findIndex] = postIt;
      } else {
        this.postIts[postIt.type].unshift(postIt);
      }
    } else {
      this.loadPostIts();
    }
  }

}
