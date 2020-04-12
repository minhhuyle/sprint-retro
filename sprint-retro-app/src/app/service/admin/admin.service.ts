import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';
import { environment } from '../../../environments/environment';
import { Theme } from '../theme/theme.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private serverUrl = environment.apiUrl + '/admin';

  constructor(private http: HttpClient, private userService: UserService) { }

  saveTheme(theme: Theme): Observable<Theme> {
    return this.http.post<Theme>(this.serverUrl + "/theme", {
      theme,
      user: this.getAdminAuth()
    });
  }

  selectThemeForRetro(themeId: number) {
    return this.http.post(this.serverUrl + '/theme/select', {
      themeId,
      user: this.getAdminAuth()
    });
  }

  startWriteBoardTheme(themeId: number) {
    return this.http.post(this.serverUrl + '/theme/start-write-board',
      { themeId, user: this.getAdminAuth()});
  }

  stopWriteBoardTheme(themeId: number) {
    return this.http.post(this.serverUrl + '/theme/stop-write-board',
      { themeId, user: this.getAdminAuth()});
  }

  getThemes() : Observable<any> {
    return this.http.post(this.serverUrl + '/themes', this.getAdminAuth());
  }

  resetAllPostIts() : Observable<any> {
    return this.http.post(this.serverUrl + '/boards/reset-all', this.getAdminAuth());
  }

  resetAllVotes() : Observable<any> {
    return this.http.post(this.serverUrl + '/boards/post-its/reset-votes', this.getAdminAuth());
  }

  private getAdminAuth() {
    const {userName, password} = this.userService.getUser();
    return {userName, password};
  }
}
