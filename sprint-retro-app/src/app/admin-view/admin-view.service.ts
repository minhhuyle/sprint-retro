import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminViewService {
  private serverUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient) { }

  authentication(authenticationForm) : Observable<any> {
    return this.http.post(this.serverUrl, authenticationForm);
  }

  reset(authenticationForm) : Observable<any> {
    return this.http.post(this.serverUrl + '/reset', authenticationForm);
  }

  saveBoard(adminBoardsFrom) : Observable<any> {
    return this.http.post(this.serverUrl + '/save-boards', adminBoardsFrom);
  }

  deleteBoard(adminDeleteBoard) : Observable<any> {
    return this.http.post(this.serverUrl + '/delete-board', adminDeleteBoard);
  }
}
