import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { PostIt } from '../../model/post-it.model';

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

  @Input()
  writeable;

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
