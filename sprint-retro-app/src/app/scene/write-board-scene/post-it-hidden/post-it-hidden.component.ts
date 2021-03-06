import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PostIt } from '../../../service/theme/theme.model';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'mle-post-it-hidden',
  templateUrl: './post-it-hidden.component.html',
  styleUrls: ['./post-it-hidden.component.scss']
})
export class PostItHiddenComponent implements OnInit, OnDestroy {
  @Input()
  postIt: PostIt;

  @Input()
  lockPostIt: boolean = true;

  @Input()
  writeable;

  @Output()
  completeOnShowAction : EventEmitter<PostIt>= new EventEmitter();

  @Output()
  closeOnAction : EventEmitter<any> = new EventEmitter();

  @Output()
  changeValueAction : EventEmitter<any> = new EventEmitter();

  private modelChanged: Subject<string> = new Subject<string>();
  private subscriptionModelChanged: Subscription;

  constructor(private http: HttpClient) {
    this.subscriptionModelChanged = this.modelChanged
      .pipe(
        debounceTime(1000))
      .subscribe(() => {
        this.changeValueAction.emit();
      });
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.subscriptionModelChanged.unsubscribe();
  }

  showPostItComment(postItComment) {
    this.http.post(environment.apiUrl +  '/add-post-it', {
      ...postItComment
    }).subscribe(() => {
      this.completeOnShowAction.emit(postItComment);
    });
  }

  closeAction() {
    this.closeOnAction.emit();
  }

  notBlank(postIt: PostIt): boolean {
    return postIt.comment?.length > 0;
  }

  changeCommentValue() {
    this.modelChanged.next();
  }
}
