import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private serverUrl = environment.apiUrl + '/boards';

  constructor(private http: HttpClient) { }

  connect() : Observable<any> {
    return this.http.get(this.serverUrl);
  }

  getAllBoards() : Observable<any> {
    return this.http.get(this.serverUrl);
  }
}
