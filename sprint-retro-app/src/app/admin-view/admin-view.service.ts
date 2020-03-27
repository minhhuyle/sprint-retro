import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Theme } from '../board/model/theme.model';
import { User } from '../user/login/user.model';

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

  getThemes(authenticationForm) : Observable<any> {
    return this.http.post(this.serverUrl + '/themes', authenticationForm);
  }

  saveThemes(themesForm: { themes: Theme[]; user: User }): Observable<any> {
    return this.http.post(this.serverUrl + '/save-themes', themesForm);
  }

  startWriteBoardTheme(themeForm: { themeId: number; user: { password: string; userName: string } }) {
    return this.http.post(this.serverUrl + '/theme/start-write-board', themeForm);
  }

  selectRetroTheme(themeForm: { themeId: number; user: { password: string; userName: string } }) {
    return this.http.post(this.serverUrl + '/theme/select', themeForm);
  }
}
