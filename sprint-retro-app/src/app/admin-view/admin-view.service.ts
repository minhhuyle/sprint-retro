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

  connect() : Observable<any> {
    return this.http.get(this.serverUrl);
  }

  authentication(authenticationForm) : Observable<any> {
    return this.http.post(this.serverUrl, authenticationForm);
  }

  reset(authenticationForm) : Observable<any> {
    return this.http.post(this.serverUrl + '/reset', authenticationForm);
  }
}
