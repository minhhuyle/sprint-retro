import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { BrowserStorageService } from '../storage/browser-storage.service';
import { User, UserLocal } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService implements CanActivate {
  private serverUrl = environment.apiUrl + '/user';
  private user: UserLocal;

  constructor(private router: Router, private http: HttpClient, private browserStorageService: BrowserStorageService) { }

  logIn(user: User): Observable<HttpResponse<any>> {
    return this.http.post<HttpResponse<any>>(this.serverUrl+ '/log-in', user , {observe: 'response'});
  }

  loadUserInfo(): Observable<any> {
    return this.http.get<HttpResponse<any>>(this.serverUrl);
  }

  resetUserVotes() {
    return this.http.post(this.serverUrl+ '/reset/vote', null);
  }

  setLoggedUser(user) {
    this.user = user;
    this.browserStorageService.setUser({
      userName: user.userName,
      password: user.password,
      isLogged: true
    })
  }

  getUser(): UserLocal {
    return this.user;
  }

  isLogged() {
    return !!this.user;
  }

  canActivate() {
    if (this.isLogged()) {
      return true;
    } else {
      this.router.navigateByUrl('');
      return false;
    }
  }

  logOut() {
    this.browserStorageService.setUser({
      userName: this.user.userName,
      password: this.user.password,
      isLogged: false
    });
    this.user = null;
    this.canActivate();
  }

  reloadUser() {
    return this.loadUserInfo();
  }

  setToken(token: string) {
    this.browserStorageService.setToken(token);
  }

  getToken(): string {
    return this.browserStorageService.getToken();
  }
}
