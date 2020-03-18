import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverUrl = environment.apiUrl + '/user';
  private user: User;

  constructor(private http: HttpClient) { }

  logIn(user: User) : Observable<any> {
    return this.http.post(this.serverUrl+ '/log-in', user);
  }

  signUp(user: User) : Observable<any> {
    return this.http.post(this.serverUrl+ '/sign-up', user);
  }

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
}
