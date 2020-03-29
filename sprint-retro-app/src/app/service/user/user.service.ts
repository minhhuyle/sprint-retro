import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
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

  logIn(user: User) : Observable<any> {
    return this.http.post(this.serverUrl+ '/log-in', user);
  }

  signUp(user: User) : Observable<any> {
    return this.http.post(this.serverUrl+ '/sign-up', user);
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
}
