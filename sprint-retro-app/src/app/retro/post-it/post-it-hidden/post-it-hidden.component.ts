import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PostIt } from '../post-it.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'mle-post-it-hidden',
  templateUrl: './post-it-hidden.component.html',
  styleUrls: ['./post-it-hidden.component.scss']
})
export class PostItHiddenComponent implements OnInit {
  @Input()
  postIt: PostIt;

  @Input()
  lockPostIt: boolean = true;

  @Output()
  completeOnShowAction : EventEmitter<PostIt>= new EventEmitter();

  constructor(private http: HttpClient) {

  }

  ngOnInit() {
  }

  showPostItComment(postItComment) {
    this.http.post(environment.apiUrl +  '/add-post-it', {
      ...postItComment
    }).subscribe(() => {
      this.completeOnShowAction.emit(postItComment);
    });
  }
}
